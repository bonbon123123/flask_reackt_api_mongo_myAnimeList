import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AnimeCard from '../components/AnimeCard';
import AnimeForm from '../components/AnimeForm';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';

const MyAnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingAnime, setEditingAnime] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const [pagination, setPagination] = useState({
        links: {},
        currentPage: 1,
        meta: { totalCount: 0 }
    });

    const fetchAnimeList = async (pageUrl) => {
        setIsLoading(true);
        setError(null);

        try {
            let data;
            if (pageUrl) {
                data = await api.getNextPage(pageUrl);
            } else {
                data = await api.getAllAnime(10, 0);

            }

            setAnimeList(data.data || []);
            setPagination({
                links: data.links || {},
                currentPage: getPageNumberFromUrl(pageUrl || data.links?.self || ''),
                meta: data.meta || { totalCount: 0 }
            });
        } catch (err) {
            console.error('Error fetching anime list:', err);
            setError('Failed to load your anime list. Please try again later.');
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

    useEffect(() => {
        fetchAnimeList();
    }, []);

    const handleEdit = (anime) => {
        setEditingAnime(anime);
        setSuccessMessage('');
    };

    const handleSave = async (updatedAnime) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage('');

        try {
            // Update the anime
            await api.updateAnime(editingAnime._id, updatedAnime);
            setSuccessMessage(`"${updatedAnime.title}" has been updated!`);
            setEditingAnime(null);

            // Refresh the current page
            const currentPageUrl = pagination.links.self;
            fetchAnimeList(currentPageUrl);
        } catch (err) {
            console.error('Error updating anime:', err);
            setError('Failed to update anime. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (animeId, animeTitle) => {
        if (!window.confirm(`Are you sure you want to delete "${animeTitle}" from your list?`)) {
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccessMessage('');
        console.log(animeId)
        try {
            await api.deleteAnime(animeId);
            setSuccessMessage(`"${animeTitle}" has been removed from your list.`);

            // Refresh the current page
            const currentPageUrl = pagination.links.self;
            fetchAnimeList(currentPageUrl);
        } catch (err) {
            console.error('Error deleting anime:', err);
            setError('Failed to delete anime. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingAnime(null);
    };

    const handlePageChange = (pageUrl) => {
        fetchAnimeList(pageUrl);
    };

    const calculateProgress = (anime) => {
        if (!anime.episodeCount) return 0;
        return Math.round((anime.watchedEpisodes?.length / anime.episodeCount) * 100);
    };

    return (
        <div className="container my-4">
            <h1>My Anime List</h1>
            {pagination.meta.totalCount > 0 && (
                <p className="text-muted">
                    You have {pagination.meta.totalCount} anime in your collection.
                </p>
            )}

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

            {isLoading && !editingAnime ? (
                <Loading />
            ) : (
                <div>
                    {editingAnime ? (
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5>Edit Anime</h5>
                            </div>
                            <div className="card-body">
                                <AnimeForm
                                    anime={editingAnime}
                                    onSubmit={handleSave}
                                    onCancel={handleCancelEdit}
                                />
                            </div>
                        </div>
                    ) : (
                        animeList.length > 0 ? (
                            <>
                                <div className="row">
                                    {animeList.map(anime => (
                                        <div key={anime._id} className="col-12 col-lg-6 mb-3">
                                            <AnimeCard
                                                anime={anime}
                                                actionButton={
                                                    <div>
                                                        <div className="d-flex gap-2">
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() => handleEdit(anime)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-danger"
                                                                onClick={() => handleDelete(anime._id, anime.title)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
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
                            <div className="alert alert-info">
                                Your anime list is empty. Go to the Search page to add anime!
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default MyAnimeList;