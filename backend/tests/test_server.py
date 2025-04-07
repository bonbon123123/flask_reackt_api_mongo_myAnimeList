import sys
import os
#pytest coud not find app without this adaptation
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import pytest
from flask import Flask
from flask.testing import FlaskClient
from server import app  
import requests_mock
from unittest.mock import patch

from unittest.mock import MagicMock

@pytest.fixture
def client() -> FlaskClient:
    """Funkcja pomocnicza, która ustawia klienta testowego."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

@pytest.fixture(scope="function", autouse=True)
def cleanup_after():
    yield
    from server import anime_collection
    anime_collection.delete_one({"_id": "123456"})


def test_add_anime(client):
    """Testowanie endpointu add_anime"""

    new_anime = {
        "_id": "123456",
        "title": "New Anime",
        "episodeCount": 24
    }

    response = client.post('/anime', json=new_anime)
    print(response.data)
    assert response.status_code == 201
    data = response.get_json()
    assert data["message"] == "Anime added successfully"
    assert data["data"]["title"] == "New Anime"


def test_anime_search(client):
    """Testowanie endpointu animeSearch"""
    with requests_mock.Mocker() as mock:
        mock.get("https://kitsu.io/api/edge/anime", json={
            "data": [{
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
            }]
        })
        response = client.get('/animeSearch?filter%5Btext%5D=duo')
        assert response.status_code == 200
        data = response.get_json()
        assert len(data["data"]) == 1
        assert data["data"][0]["title"] == "Legend of Duo"
        assert "coverImage" in data["data"][0]



def test_get_all_anime(client):
    """Testowanie endpointu get_all_anime"""
    # Mockowanie bazy danych MongoDB
    mock_cursor = MagicMock()
    mock_cursor.skip.return_value = mock_cursor
    mock_cursor.limit.return_value = mock_cursor
    mock_cursor.__iter__.return_value = iter([{
        "_id": 1,
        "title": "Anime 1",
        "episodeCount": 10
    }])

    with patch("server.anime_collection.count_documents", return_value=5), \
         patch("server.anime_collection.find", return_value=mock_cursor):
        response = client.get('/anime?page[limit]=10&page[offset]=0')
    assert response.status_code == 200


def test_add_anime(client):
    """Testowanie endpointu add_anime"""
    new_anime = {
        "_id": "123456",
        "title": "New Anime",
        "episodeCount": 24
    }
    response = client.post('/anime', json=new_anime)
    print(response.data) 
    assert response.status_code == 201
    data = response.get_json()
    assert data["message"] == "Anime added successfully"
    assert data["data"]["title"] == "New Anime"


def test_get_anime(client):
    """Testowanie endpointu get_anime"""
    with patch("server.anime_collection.find_one", return_value={
        "_id": "123456",
        "title": "New Anime"
    }):
        response = client.get('/anime/123456')
        assert response.status_code == 200
        data = response.get_json()
        assert data["title"] == "New Anime"





def test_update_anime(client):
    """Testowanie endpointu update_anime"""
    updated_anime = {"title": "Updated Anime"}
    mock_result = MagicMock()
    mock_result.matched_count = 1  
    mock_result.modified_count = 1  

    with patch("server.anime_collection.update_one", return_value=mock_result), \
         patch("server.anime_collection.find_one", return_value=updated_anime):
        response = client.put('/anime/123456', json=updated_anime)
    assert response.status_code == 200


def test_delete_anime(client):
    """Testowanie endpointu delete_anime"""
    mock_result = MagicMock()
    mock_result.deleted_count = 1  # Symulowanie liczby usuniętych dokumentów

    with patch("server.anime_collection.delete_one", return_value=mock_result):
        response = client.delete('/anime/123456')
    assert response.status_code == 200
