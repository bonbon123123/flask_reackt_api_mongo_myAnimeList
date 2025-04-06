from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import requests

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

@app.route("/animeSearch", methods=["GET"])
def anime_search():
    print("Received request for anime search")
    params = request.args.to_dict()
    print(f"Parameters: {params}")
    response = make_kitsu_api_request("anime", params)
    print(f"Kitsu API response: {response}")
    return jsonify(response)

@app.route("/anime", methods=["GET"])
def get_all_anime():
    anime_list = list(anime_collection.find({}, {'_id': False}))
    return jsonify(anime_list)

@app.route("/anime/<int:anime_id>", methods=["GET"])
def get_anime(anime_id):
    anime = anime_collection.find_one({"id_": anime_id}, {'_id': False})
    if anime:
        return jsonify(anime)
    return jsonify({"error": "Anime not found"}), 404

@app.route("/anime", methods=["POST"])
def add_anime():
    data = request.get_json()
    anime_collection.insert_one(data)
    return jsonify({"message": "Anime added"}), 201

if __name__ == "__main__":
    print("Printing URL Map:")
    app.debug = True  
    print(app.url_map) 
    app.run(host="0.0.0.0", port=5000)

