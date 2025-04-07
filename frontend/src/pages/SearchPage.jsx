import React, { useState } from 'react';
import api from '../services/api';
import AnimeCard from '../components/AnimeCard';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

const AnimeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [pagination, setPagination] = useState({
        links: {},
        currentPage: 1
    });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setIsLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const data = await api.searchAnime(searchTerm);
            setSearchResults(data.data || []);
            setPagination({
                links: data.links || {},
                currentPage: 1
            });
        } catch (err) {
            console.error('Error searching anime:', err);
            setError('Failed to search anime. Please try again later.');
            setSearchResults([]);
            setPagination({ links: {}, currentPage: 1 });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = async (pageUrl) => {
        if (!pageUrl) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await api.getNextPage(pageUrl);
            setSearchResults(data.data || []);

            // Update pagination info
            const pageNumber = getPageNumberFromUrl(pageUrl);
            setPagination({
                links: data.links || {},
                currentPage: pageNumber || pagination.currentPage
            });
        } catch (err) {
            console.error('Error fetching page:', err);
            setError('Failed to load page. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getPageNumberFromUrl = (url) => {
        try {
            const urlObj = new URL(url);
            const limit = parseInt(urlObj.searchParams.get('page[limit]'));
            const offset = parseInt(urlObj.searchParams.get('page[offset]'));
            return Math.floor(offset / limit) + 1;
        } catch (e) {
            return 1;
        }
    };

    const handleAddAnime = async (animeData) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            const response = await api.addAnime(animeData);
            console.log(response)
            setSuccessMessage(`"${animeData.title}" has been added to your list!`);

            // Remove the added anime from search results
            setSearchResults(searchResults.filter(anime => anime.id !== animeData.id));
        } catch (err) {
            console.error('Error adding anime:', err);
            setError('Failed to add anime. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container my-4">
            <h1>Search Anime</h1>

            <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for anime..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {searchResults.length > 0 ? (
                        <>
                            <div className="row">
                                {searchResults.map(anime => (
                                    <div key={anime.id} className="col-12 col-md-6 mb-3">
                                        <AnimeCard
                                            anime={anime}
                                            actionButton={
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleAddAnime(anime)}
                                                >
                                                    Add to My List
                                                </button>
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            {Object.keys(pagination.links).length > 0 && (
                                <div className="mt-4">
                                    <Pagination
                                        links={pagination.links}
                                        currentPage={pagination.currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        searchTerm && !isLoading && (
                            <div className="alert alert-info">
                                No anime found. Try another search term.
                            </div>
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default AnimeSearch;