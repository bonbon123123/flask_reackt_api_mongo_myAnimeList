import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import pytest
from flask import Flask
from flask.testing import FlaskClient
from server import app
import requests_mock
from unittest.mock import patch, MagicMock
from bson import ObjectId

@pytest.fixture
def client() -> FlaskClient:
    """Fixture that sets up a test client."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

@pytest.fixture(scope="function", autouse=True)
def cleanup_after():
    """Clean up the test data after each test."""
    yield
    from server import anime_collection
    anime_collection.delete_many({"_id": {"$in": ["123456", "sample1", "sample2"]}})

# Mock anime data for testing
@pytest.fixture
def sample_anime():
    return {
        "_id": "123456",
        "title": "Anime",
        "coverImage": {
            "tiny": "http://tiny.url",
            "original": "http://original.url"
        },
        "episodeCount": 24,
        "watchedEpisodes": [],
        "completed": False,
        "startedWatching": None,
        "finishedWatching": None,
        "rating": 0,
        "apiLink": "https://kitsu.io/api/edge/anime/123456",
        "synopsis": "This is a anime synopsis",
        "popularityRank": 100,
        "ratingRank": 200
    }

@pytest.fixture
def kitsu_api_response():
    """Mock response from Kitsu API"""
    return {
        "data": [
            {
                "id": "555",
                "attributes": {
                    "titles": {"en": "Legend of Duo"},
                    "posterImage": {"tiny": "http://tiny.url", "original": "http://original.url"},
                    "episodeCount": 12,
                    "synopsis": "Some synopsis",
                    "popularityRank": 5783,
                    "ratingRank": 12249,
                    "canonicalTitle": "Legend of Duo"
                },
                "links": {"self": "https://kitsu.io/api/edge/anime/555"}
            }
        ],
        "links": {
            "first": "https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=0",
            "next": "https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=10"
        }
    }

@pytest.fixture
def top_anime_response():
    """Mock response for top anime from Kitsu API"""
    return {
        "data": [
            {
                "id": "1",
                "attributes": {
                    "titles": {"en": "Top Anime 1"},
                    "posterImage": {"tiny": "http://tiny1.url", "original": "http://original1.url"},
                    "episodeCount": 12,
                    "synopsis": "Top anime synopsis 1",
                    "popularityRank": 1,
                    "ratingRank": 1,
                    "canonicalTitle": "Top Anime 1"
                },
                "links": {"self": "https://kitsu.io/api/edge/anime/1"}
            },
            {
                "id": "2",
                "attributes": {
                    "titles": {"en": "Top Anime 2"},
                    "posterImage": {"tiny": "http://tiny2.url", "original": "http://original2.url"},
                    "episodeCount": 24,
                    "synopsis": "Top anime synopsis 2",
                    "popularityRank": 2,
                    "ratingRank": 2,
                    "canonicalTitle": "Top Anime 2"
                },
                "links": {"self": "https://kitsu.io/api/edge/anime/2"}
            }
        ]
    }

# Test /animeSearch endpoint
def test_anime_search(client, kitsu_api_response):
    """Test the animeSearch endpoint."""
    with requests_mock.Mocker() as mock:
        mock.get("https://kitsu.io/api/edge/anime", json=kitsu_api_response)
        
        response = client.get('/animeSearch?filter[text]=duo')
        
        assert response.status_code == 200
        data = response.get_json()
        assert len(data["data"]) == 1
        assert data["data"][0]["title"] == "Legend of Duo"
        assert data["data"][0]["coverImage"]["tiny"] == "http://tiny.url"
        assert data["data"][0]["episodeCount"] == 12
        assert "links" in data

def test_anime_search_with_error(client):
    """Test the animeSearch endpoint with a request error."""
    with requests_mock.Mocker() as mock:
        mock.get("https://kitsu.io/api/edge/anime", status_code=500)
        
        response = client.get('/animeSearch?filter[text]=error')
        
        assert response.status_code == 200
        data = response.get_json()
        assert "error" in data

# Test /anime GET endpoint (get all anime)
def test_get_all_anime_empty(client):
    """Test getting all anime when the database is empty."""
    with patch("server.anime_collection.count_documents", return_value=0), \
         patch("server.anime_collection.find", return_value=MagicMock(
             skip=lambda x: MagicMock(
                 limit=lambda y: []
             )
         )):
        response = client.get('/anime')
        
        assert response.status_code == 200
        data = response.get_json()
        assert len(data["data"]) == 0
        assert data["meta"]["totalCount"] == 0
        assert "links" in data

def test_get_all_anime_with_results(client):
    """Test getting all anime with pagination."""
    mock_anime_list = [
        {"_id": ObjectId("60d5ec7a1c9d440015023456"), "title": "Anime 1"},
        {"_id": ObjectId("60d5ec7a1c9d440015023457"), "title": "Anime 2"}
    ]
    
    mock_cursor = MagicMock()
    mock_cursor.skip.return_value = mock_cursor
    mock_cursor.limit.return_value = mock_anime_list
    
    with patch("server.anime_collection.count_documents", return_value=2), \
         patch("server.anime_collection.find", return_value=mock_cursor):
        response = client.get('/anime?page[limit]=10&page[offset]=0')
        
        assert response.status_code == 200
        data = response.get_json()
        assert len(data["data"]) == 2
        assert data["meta"]["totalCount"] == 2
        assert "links" in data
        # Check ID conversion from ObjectId to string
        assert isinstance(data["data"][0]["_id"], str)

# Test /animeids GET endpoint
def test_get_all_anime_ids(client):
    """Test the animeids endpoint."""
    mock_ids = [{"_id": "123"}, {"_id": "456"}]
    
    with patch("server.anime_collection.find", return_value=mock_ids):
        response = client.get('/animeids')
        
        assert response.status_code == 200
        data = response.get_json()
        assert "data" in data
        assert len(data["data"]) == 2
        assert "123" in data["data"]
        assert "456" in data["data"]

# Test /anime/<anime_id> GET endpoint
def test_get_anime_exists(client, sample_anime):
    """Test getting a specific anime that exists."""
    with patch("server.anime_collection.find_one", return_value=sample_anime):
        response = client.get('/anime/123456')
        
        assert response.status_code == 200
        data = response.get_json()
        assert data["title"] == "Anime"
        assert data["episodeCount"] == 24

def test_get_anime_not_found(client):
    """Test getting a non-existent anime."""
    with patch("server.anime_collection.find_one", return_value=None):
        response = client.get('/anime/nonexistent')
        
        assert response.status_code == 404
        data = response.get_json()
        assert "error" in data
        assert data["error"] == "Anime not found"

# Test /anime POST endpoint
def test_add_anime_new(client, sample_anime):
    """Test adding a new anime."""
    with patch("server.anime_collection.find_one", return_value=None), \
         patch("server.anime_collection.insert_one"):
        response = client.post('/anime', json=sample_anime)
        
        assert response.status_code == 201
        data = response.get_json()
        assert data["message"] == "Anime added successfully"
        assert data["data"]["title"] == "Anime"

def test_add_anime_existing(client, sample_anime):
    """Test adding an anime that already exists."""
    with patch("server.anime_collection.find_one", return_value=sample_anime):
        response = client.post('/anime', json=sample_anime)
        
        assert response.status_code == 200
        data = response.get_json()
        assert data["message"] == "Anime already exists"
        assert data["data"]["title"] == "Anime"

def test_add_anime_error(client, sample_anime):
    """Test adding an anime with a database error."""
    with patch("server.anime_collection.find_one", return_value=None), \
         patch("server.anime_collection.insert_one", side_effect=Exception("Database error")):
        response = client.post('/anime', json=sample_anime)
        
        assert response.status_code == 400
        data = response.get_json()
        assert "error" in data

# Test /anime/<anime_id> PUT endpoint
def test_update_anime_exists(client):
    """Test updating an anime that exists."""
    update_data = {"title": "Updated Anime", "rating": 5}
    updated_anime = {"_id": "123456", "title": "Updated Anime", "rating": 5}
    
    mock_result = MagicMock()
    mock_result.matched_count = 1
    
    with patch("server.anime_collection.update_one", return_value=mock_result), \
         patch("server.anime_collection.find_one", return_value=updated_anime):
        response = client.put('/anime/123456', json=update_data)
        
        assert response.status_code == 200
        data = response.get_json()
        assert data["message"] == "Anime updated successfully"
        assert data["data"]["title"] == "Updated Anime"
        assert data["data"]["rating"] == 5

def test_update_anime_not_found(client):
    """Test updating a non-existent anime."""
    update_data = {"title": "Updated Anime"}
    
    mock_result = MagicMock()
    mock_result.matched_count = 0
    
    with patch("server.anime_collection.update_one", return_value=mock_result):
        response = client.put('/anime/nonexistent', json=update_data)
        
        assert response.status_code == 404
        data = response.get_json()
        assert "error" in data
        assert data["error"] == "Anime not found"

# Test /anime/<anime_id> DELETE endpoint
def test_delete_anime_exists(client):
    """Test deleting an anime that exists."""
    mock_result = MagicMock()
    mock_result.deleted_count = 1
    
    with patch("server.anime_collection.delete_one", return_value=mock_result):
        response = client.delete('/anime/123456')
        
        assert response.status_code == 200
        data = response.get_json()
        assert data["message"] == "Anime deleted successfully"

def test_delete_anime_not_found(client):
    """Test deleting a non-existent anime."""
    mock_result = MagicMock()
    mock_result.deleted_count = 0
    
    with patch("server.anime_collection.delete_one", return_value=mock_result):
        response = client.delete('/anime/nonexistent')
        
        assert response.status_code == 404
        data = response.get_json()
        assert "error" in data
        assert data["error"] == "Anime not found"

# Test /addSampleAnime POST endpoint
def test_add_sample_anime_success(client, top_anime_response):
    """Test adding sample anime successfully."""
    with requests_mock.Mocker() as mock:
        mock.get("https://kitsu.io/api/edge/anime", json=top_anime_response)
        
        with patch("server.anime_collection.find_one", return_value=None), \
             patch("server.anime_collection.insert_one"):
            response = client.post('/addSampleAnime')
            
            assert response.status_code == 201
            data = response.get_json()
            assert data["message"] == "Top 20 popular anime added successfully"
            assert len(data["data"]) == 2
            assert data["data"][0]["title"] == "Top Anime 1"
            assert data["data"][1]["title"] == "Top Anime 2"

def test_add_sample_anime_api_error(client):
    """Test adding sample anime with API error."""
    with requests_mock.Mocker() as mock:
        mock.get("https://kitsu.io/api/edge/anime", status_code=500)
        
        response = client.post('/addSampleAnime')
        
        assert response.status_code == 500
        data = response.get_json()
        assert "error" in data

def test_add_sample_anime_db_error(client, top_anime_response):
    """Test adding sample anime with database error."""
    with requests_mock.Mocker() as mock:
        mock.get("https://kitsu.io/api/edge/anime", json=top_anime_response)
        
        with patch("server.anime_collection.find_one", return_value=None), \
             patch("server.anime_collection.insert_one", side_effect=Exception("Database error")):
            response = client.post('/addSampleAnime')
            
            assert response.status_code == 500
            data = response.get_json()
            assert "error" in data

# Test helper functions
def test_format_kitsu_data():
    """Test the format_kitsu_data function."""
    from server import format_kitsu_data
    
    kitsu_anime = {
        "id": "123",
        "attributes": {
            "titles": {"en": "Anime"},
            "posterImage": {"tiny": "http://tiny.url", "original": "http://original.url"},
            "episodeCount": 12,
            "synopsis": "Test synopsis",
            "popularityRank": 100,
            "ratingRank": 200,
            "canonicalTitle": "Anime"
        },
        "links": {"self": "https://kitsu.io/api/edge/anime/123"}
    }
    
    formatted = format_kitsu_data(kitsu_anime)
    
    assert formatted["_id"] == "123"
    assert formatted["title"] == "Anime"
    assert formatted["coverImage"]["tiny"] == "http://tiny.url"
    assert formatted["episodeCount"] == 12
    assert formatted["synopsis"] == "Test synopsis"
    assert formatted["popularityRank"] == 100
    assert formatted["ratingRank"] == 200
    assert formatted["apiLink"] == "https://kitsu.io/api/edge/anime/123"
    assert formatted["watchedEpisodes"] == []
    assert formatted["completed"] is False
    assert formatted["rating"] == 0

def test_format_kitsu_data_missing_fields():
    """Test the format_kitsu_data function with missing fields."""
    from server import format_kitsu_data
    
    kitsu_anime = {
        "id": "123",
        "attributes": {
            "titles": {"en_jp": "Anime JP"},
            "synopsis": "Test synopsis",
        },
        "links": {"self": "https://kitsu.io/api/edge/anime/123"}
    }
    
    formatted = format_kitsu_data(kitsu_anime)
    
    assert formatted["_id"] == "123"
    assert formatted["title"] == "Anime JP"
    assert formatted["coverImage"]["tiny"] is None
    assert formatted["episodeCount"] is None
    assert formatted["synopsis"] == "Test synopsis"
    assert formatted["popularityRank"] is None
    assert formatted["ratingRank"] is None

def test_create_pagination_links():
    """Test the create_pagination_links function."""
    from server import create_pagination_links
    
    base_url = "http://test.com/api"
    page_limit = 10
    page_offset = 20
    total_count = 100
    
    links = create_pagination_links(base_url, page_limit, page_offset, total_count)
    
    assert links["self"] == "http://test.com/api?page[limit]=10&page[offset]=20"
    assert links["first"] == "http://test.com/api?page[limit]=10&page[offset]=0"
    assert links["next"] == "http://test.com/api?page[limit]=10&page[offset]=30"
    assert links["prev"] == "http://test.com/api?page[limit]=10&page[offset]=10"
    assert links["last"] == "http://test.com/api?page[limit]=10&page[offset]=90"

def test_make_kitsu_api_request_success():
    """Test the make_kitsu_api_request function with a successful response."""
    from server import make_kitsu_api_request
    
    with requests_mock.Mocker() as mock:
        mock.get("https://kitsu.io/api/edge/test", json={"data": "success"})
        
        result = make_kitsu_api_request("test", {})
        
        assert result == {"data": "success"}

def test_make_kitsu_api_request_error():
    """Test the make_kitsu_api_request function with an error."""
    from server import make_kitsu_api_request
    
    with requests_mock.Mocker() as mock:
        mock.get("https://kitsu.io/api/edge/test", status_code=500)
        
        result = make_kitsu_api_request("test", {})
        
        assert "error" in result