db = db.getSiblingDB('animeDB');

db.anime.insertOne({
    _id: "0",
    title: "The Seven Deadly",
    coverImage: {
        tiny: "https://media.kitsu.app/anime/cover_images/42586/tiny.jpg",
        original: "https://media.kitsu.app/anime/cover_images/42586/original.png"
    },
    episodeCount: 1,
    watchedEpisodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    completed: true,
    startedWatching: new Date("2024-02-06"),
    finishedWatching: new Date("2025-06-11"),
    rating: 6,
    apiLink: "https://kitsu.io/api/edge/anime/12633",
    synopsis: "No Game No Life is a surreal comedy that follows Sora and Shiro, shut-in NEET siblings...",
    popularityRank: 24,
    ratingRank: 8
});
