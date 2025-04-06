# Anime MongoDB Docker

Prosty projekt z MongoDB, który trzyma dane o obejrzanym anime.

## Jak odpalić

Wystarczy mieć zainstalowanego Dockera, a potem w terminalu:

```bash
git clone https://github.com/bonbon123123/Flask-reackt-api-mongo-myAnimeList.git
cd anime-mongodb-docker
docker-compose up
jeżeli był problem z dostępem do folderu init, to kontener mógł nie wystartować, trzba dać pozwolenie na dostęp do tego folderu i jeszcze odpalić całość np tak:

docker-compose down -v
docker system prune -f
docker-compose up 

