from flask import Flask, jsonify, request, url_for
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import requests
from bson import ObjectId
import re

load_dotenv()

app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_database()
anime_collection = db.anime

KITSU_API_URL = "https://kitsu.io/api/edge/"

def make_kitsu_api_request(endpoint, params):
    try:
        response = requests.get(KITSU_API_URL + endpoint, params=params)
        response.raise_for_status() 
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

def format_kitsu_data(kitsu_anime):
    """
    Format Kitsu API data to our consistent application format
    """
    return {
        "_id": kitsu_anime.get("id"),
        "title": kitsu_anime["attributes"]["titles"].get("en") or 
                kitsu_anime["attributes"]["titles"].get("en_jp") or 
                kitsu_anime["attributes"].get("canonicalTitle"),
        "coverImage": {
            "tiny": kitsu_anime["attributes"]["posterImage"].get("tiny") if kitsu_anime["attributes"].get("posterImage") else None,
            "original": kitsu_anime["attributes"]["posterImage"].get("original") if kitsu_anime["attributes"].get("posterImage") else None
        },
        "episodeCount": kitsu_anime["attributes"].get("episodeCount"),
        "watchedEpisodes": [],  
        "completed": False,     
        "startedWatching": None,
        "finishedWatching": None,
        "rating": 0,            
        "apiLink": kitsu_anime["links"].get("self") if "links" in kitsu_anime else None,
        "synopsis": kitsu_anime["attributes"].get("synopsis"),
        "popularityRank": kitsu_anime["attributes"].get("popularityRank"),
        "ratingRank": kitsu_anime["attributes"].get("ratingRank")
    }

def create_pagination_links(base_url, page_limit, page_offset, total_count):
    """
    Create standardized pagination links for API responses
    """
    links = {
        "first": f"{base_url}?page[limit]={page_limit}&page[offset]=0",
        "self": f"{base_url}?page[limit]={page_limit}&page[offset]={page_offset}"
    }
    
    if page_offset + page_limit < total_count:
        links["next"] = f"{base_url}?page[limit]={page_limit}&page[offset]={page_offset + page_limit}"
    
    if page_offset > 0:
        prev_offset = max(0, page_offset - page_limit)
        links["prev"] = f"{base_url}?page[limit]={page_limit}&page[offset]={prev_offset}"
    
    # Calculate the last page offset based on total count
    last_offset = max(0, ((total_count - 1) // page_limit) * page_limit)
    links["last"] = f"{base_url}?page[limit]={page_limit}&page[offset]={last_offset}"
    
    return links

@app.route("/animeSearch", methods=["GET"])
def anime_search():
    """
    Search anime from Kitsu API and format results consistently
    """
    params = request.args.to_dict()
    response = make_kitsu_api_request("anime", params)
    
    if "data" in response:
        formatted_data = [format_kitsu_data(anime) for anime in response["data"]]
        result = {
            "data": formatted_data,
            "links": response.get("links", {}),
        }
        return jsonify(result)
    
    return jsonify(response)

@app.route("/anime", methods=["GET"])
def get_all_anime():
    """
    Get all saved anime with pagination support
    """
    page_limit = int(request.args.get("page[limit]", 10))
    page_offset = int(request.args.get("page[offset]", 0))
    
    # Get total count for pagination
    total_count = anime_collection.count_documents({})
    
    # Get paginated results
    anime_list = list(anime_collection.find({})
                     .skip(page_offset)
                     .limit(page_limit))
    
    # Convert ObjectId to string for JSON serialization
    for anime in anime_list:
        if '_id' in anime and isinstance(anime['_id'], ObjectId):
            anime['_id'] = str(anime['_id'])
    
    base_url = request.host_url.rstrip('/') + request.path
    links = create_pagination_links(base_url, page_limit, page_offset, total_count)
    
    result = {
        "data": anime_list,
        "links": links,
        "meta": {
            "count": len(anime_list),
            "totalCount": total_count
        }
    }
    
    return jsonify(result)


@app.route("/animeids", methods=["GET"])
def get_all_anime_ids():
    """
    Get all anime IDs from the database
    """
    ids_cursor = anime_collection.find({}, {"_id": 1})
    ids = [str(doc["_id"]) for doc in ids_cursor]

    return jsonify({
        "data": ids,
    })

@app.route("/anime/<anime_id>", methods=["GET"])
def get_anime(anime_id):
    """
    Get a specific anime by ID
    """
    anime = anime_collection.find_one({"_id": anime_id})
    if anime:
        if '_id' in anime and isinstance(anime['_id'], ObjectId):
            anime['_id'] = str(anime['_id'])
        return jsonify(anime)
    return jsonify({"error": "Anime not found"}), 404

@app.route("/anime", methods=["POST"])
def add_anime():
    data = request.get_json()

    try:
        # Check if anime already exists
        existing = anime_collection.find_one({"_id": data.get("_id")})
        if existing:
            return jsonify({"message": "Anime already exists", "data": data}), 200
        
        # Insert the new anime
        anime_collection.insert_one(data)
        return jsonify({"message": "Anime added successfully", "data": data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/anime/<anime_id>", methods=["PUT"])
def update_anime(anime_id):
    data = request.get_json()
    
    # Remove _id from data to prevent update errors
    if "_id" in data:
        del data["_id"]

    result = anime_collection.update_one(
        {"_id": anime_id},
        {"$set": data}
    )

    if result.matched_count:
        updated_anime = anime_collection.find_one({"_id": anime_id})
        # Convert ObjectId to string if needed
        if updated_anime and '_id' in updated_anime and isinstance(updated_anime['_id'], ObjectId):
            updated_anime['_id'] = str(updated_anime['_id'])
        return jsonify({"message": "Anime updated successfully", "data": updated_anime})

    return jsonify({"error": "Anime not found"}), 404

@app.route("/anime/<anime_id>", methods=["DELETE"])
def delete_anime(anime_id):
    """
    Delete an anime from the database
    """
    result = anime_collection.delete_one({"_id": anime_id})
    
    if result.deleted_count:
        return jsonify({"message": "Anime deleted successfully"})
    
    return jsonify({"error": "Anime not found"}), 404

@app.route("/addSampleAnime", methods=["POST"])
def add_sample_anime():
    """
    Fetch the top 20 most popular anime from Kitsu API and add them to the database.
    """
    params = {
        "sort": "popularityRank",
        "page[limit]": 20
    }

    # Fetch data from the Kitsu API
    response = make_kitsu_api_request("anime", params)

    if "data" in response:
        # Format the top 20 anime data
        formatted_data = [format_kitsu_data(anime) for anime in response["data"]]
        
        # Insert each formatted anime into the database
        for anime in formatted_data:
            # Check if anime already exists to avoid duplicates
            existing_anime = anime_collection.find_one({"_id": anime["_id"]})
            if not existing_anime:
                try:
                    anime_collection.insert_one(anime)
                except Exception as e:
                    return jsonify({"error": f"Failed to insert anime {anime['title']}: {str(e)}"}), 500
        
        return jsonify({
            "message": "Top 20 popular anime added successfully",
            "data": formatted_data
        }), 201

    return jsonify({"error": "Failed to fetch top 20 anime from Kitsu"}), 500



if __name__ == "__main__":
    app.debug = True  
    app.run(host="0.0.0.0", port=5000)