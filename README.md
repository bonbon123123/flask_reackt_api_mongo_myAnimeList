# Anime MongoDB Docker

Prosty projekt z MongoDB, który trzyma dane o obejrzanym anime.

## Jak odpalić

Wystarczy mieć zainstalowanego Dockera, a potem w terminalu:

```bash
git clone https://github.com/bonbon123123/flask_reackt_api_mongo_myAnimeList.git
cd .\flask_reackt_api_mongo_myAnimeList\
docker-compose up
jeżeli był problem z dostępem do folderu init, to kontener mógł nie wystartować, trzeba dać pozwolenie na dostęp do tego folderu i jeszcze odpalić całość np tak:

docker-compose up 
docker-compose down -v
docker-compose up 

odpalić nowy terminal
cd .\flask_reackt_api_mongo_myAnimeList\frontend


testy
docker-compose exec backend pytest /app/tests/test_server.py

żeby odpalić front end, trzeba wejść we fronend zainstalować zależności