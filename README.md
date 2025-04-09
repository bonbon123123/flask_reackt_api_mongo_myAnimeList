# Anime MongoDB Docker

project with MongoDB that stores data about watched anime

## How to start

You just to have Docker and node installed, and then run the following in the terminal

```bash
git clone https://github.com/bonbon123123/flask_reackt_api_mongo_myAnimeList.git
cd .\flask_reackt_api_mongo_myAnimeList\
docker-compose up --build
```
If there was an issue with folder access to the `init` folder, the container might not have started. You need to grant permission for accessing that folder and then start everything again, for example, like this:

```bash
docker-compose up 
docker-compose down -v
docker-compose up 
```

To run the front-end, open a new terminal:
```bash
cd .\flask_reackt_api_mongo_myAnimeList\frontend
npm install
npm start
```

Tests from same place that docker-compose up:
docker-compose exec backend pytest /app/tests/test_server.py

