import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = {
    // Search anime from Kitsu API through our backend
    searchAnime: async (query, pageLimit, pageOffset = 0, sortBy = '') => {
        const response = await axios.get(`${API_URL}/animeSearch`, {
            params: {
                'filter[text]': query,
                'page[limit]': pageLimit,
                'page[offset]': pageOffset,
                'sort': sortBy,
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
    // Get all saved anime id's from database wihout pagination 
    getAllAnimeID: async () => {
        const response = await axios.get(`${API_URL}/animeids`);
        return response.data;
    },
    // Get a specific anime by ID
    getAnimeById: async (animeId) => {
        const response = await axios.get(`${API_URL}/anime/${animeId}`);
        return response.data;
    },

    // Add a new anime to our database
    addAnime: async (animeData) => {
        try {
            const response = await axios.post(`${API_URL}/anime`, animeData);
            return response.data;
        } catch (error) {
            console.error("Error adding anime:", error);
            throw error;
        }
    },

    // Update an existing anime with partial data
    updateAnime: async (animeId, updateData) => {
        try {
            const response = await axios.put(`${API_URL}/anime/${animeId}`, updateData);
            return response.data;
        } catch (error) {
            console.error("Error updating anime:", error);
            throw error;
        }
    },

    // Delete an anime from the list
    deleteAnime: async (animeId) => {
        try {
            const response = await axios.delete(`${API_URL}/anime/${animeId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting anime:", error);
            throw error;
        }
    },


};

export default api;