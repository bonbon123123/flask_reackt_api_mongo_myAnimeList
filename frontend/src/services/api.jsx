import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = {
    // Search anime from Kitsu API through our backend
    searchAnime: async (query, pageLimit = 20, pageOffset = 0) => {
        const response = await axios.get(`${API_URL}/animeSearch`, {
            params: {
                'filter[text]': query,
                'page[limit]': pageLimit,
                'page[offset]': pageOffset
            }
        });
        return response.data;
    },

    // Get all saved anime from our database with pagination
    getAllAnime: async (pageLimit = 10, pageOffset = 0) => {
        const response = await axios.get(`${API_URL}/anime`, {
            params: {
                'page[limit]': pageLimit,
                'page[offset]': pageOffset
            }
        });
        return response.data;
    },

    // Get a specific anime by ID
    getAnimeById: async (animeId) => {
        const response = await axios.get(`${API_URL}/anime/${animeId}`);
        return response.data;
    },

    // Add a new anime to our database
    addAnime: async (animeData) => {
        console.log(animeData)
        const response = await axios.post(`${API_URL}/anime`, animeData);
        return response.data;
    },

    // Update an existing anime with partial data
    updateAnime: async (animeId, updateData) => {
        const response = await axios.put(`${API_URL}/anime/${animeId}`, updateData);
        return response.data;
    },

    // Delete an anime from the list
    deleteAnime: async (animeId) => {
        const response = await axios.delete(`${API_URL}/anime/${animeId}`);
        return response.data;
    },

    // Get next page of results using pagination URL
    getNextPage: async (nextPageUrl) => {
        if (!nextPageUrl) return null;

        // Extract the path and query params from the full URL
        const url = new URL(nextPageUrl);
        const path = url.pathname.replace(/^\/+/, '');
        const params = Object.fromEntries(url.searchParams);

        const response = await axios.get(`${API_URL}/${path}`, { params });
        return response.data;
    }
};

export default api;