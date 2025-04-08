import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import AnimeCard from '../components/AnimeCard';
import AnimeForm from '../components/AnimeForm';
import Loading from '../components/Loading';

const MyAnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingAnime, setEditingAnime] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // New pagination controls
    const [page, setPage] = useState(0);
    const [amountOfItems, setAmountOfItems] = useState(20);
    const [totalCount, setTotalCount] = useState(0);

    // New sorting controls
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [originalAnimeList, setOriginalAnimeList] = useState([]);

    // New search control
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAnimeList, setFilteredAnimeList] = useState([]);

    const fetchAnimeList = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Calculate offset based on page and amountOfItems
            const offset = page * amountOfItems;

            // Get data with new pagination parameters
            const data = await api.getAllAnime(amountOfItems, offset);
            console.log(data.data[0]);
            setOriginalAnimeList(data.data || []);
            setFilteredAnimeList(data.data || []);
            setTotalCount(data.meta?.totalCount || 0);
        } catch (err) {
            console.error('Error fetching anime list:', err);
            setError('Failed to load your anime list. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, [page, amountOfItems]);

    // Filter anime list based on search term
    useEffect(() => {
        if (originalAnimeList.length > 0) {
            const filtered = searchTerm.trim() === ''
                ? originalAnimeList
                : originalAnimeList.filter(anime =>
                    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            setFilteredAnimeList(filtered);
        }
    }, [searchTerm, originalAnimeList]);

    // Sort anime list based on sortBy and sortOrder
    useEffect(() => {
        if (filteredAnimeList.length > 0) {
            const sortedList = [...filteredAnimeList].sort((a, b) => {
                let valueA, valueB;

                // Handle different sort types
                switch (sortBy) {
                    case 'title':
                        valueA = a.title.toLowerCase();
                        valueB = b.title.toLowerCase();
                        break;
                    case 'rating':
                        valueA = a.rating || 0;
                        valueB = b.rating || 0;
                        break;
                    case 'finishedWatching':
                        valueA = a.finishedWatching ? new Date(a.finishedWatching).getTime() : 0;
                        valueB = b.finishedWatching ? new Date(b.finishedWatching).getTime() : 0;
                        break;
                    case 'completed':
                        valueA = a.completed ? 1 : 0;
                        valueB = b.completed ? 1 : 0;
                        break;
                    default:
                        valueA = a.title.toLowerCase();
                        valueB = b.title.toLowerCase();
                }

                // Sort based on order
                if (sortOrder === 'asc') {
                    return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
                } else {
                    return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
                }
            });

            setAnimeList(sortedList);
        } else {
            setAnimeList([]);
        }
    }, [filteredAnimeList, sortBy, sortOrder]);

    useEffect(() => {
        fetchAnimeList();
    }, [page, amountOfItems, fetchAnimeList]);

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
            fetchAnimeList();
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

        try {
            await api.deleteAnime(animeId);
            setSuccessMessage(`"${animeTitle}" has been removed from your list.`);

            // Refresh the current page
            fetchAnimeList();
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

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(0); // Reset to first page when search changes
    };

    // Calculate total pages based on filtered list length and amountOfItems
    const filteredTotalCount = filteredAnimeList.length;
    const totalPages = Math.ceil(filteredTotalCount / amountOfItems);

    // Handle previous page button
    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    // Handle next page button
    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    // Calculate displayed range
    const startItem = page * amountOfItems + 1;
    const endItem = Math.min((page + 1) * amountOfItems, filteredTotalCount);

    return (
        <div className="container mx-auto px-4 my-10">
            <h1 className="text-2xl font-bold mb-4">My Anime List</h1>

            {totalCount > 0 && (
                <p className="text-gray-600 mb-4">
                    You have {totalCount} anime in your collection.
                    {searchTerm && ` Showing ${filteredTotalCount} results for "${searchTerm}".`}
                </p>
            )}

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4">
                    <div className="flex flex-wrap">
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            {/* Sorting Controls */}
            <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4">
                    <div className="flex flex-wrap items-center">
                        <label htmlFor="sortBy" className="mr-2 mb-2 md:mb-0">Sort by:</label>
                        <select
                            id="sortBy"
                            className="border rounded px-2 py-1 mr-2 mb-2 md:mb-0"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="title">Title</option>
                            <option value="rating">Rating</option>
                            <option value="finishedWatching">Finished Watching Date</option>
                            <option value="completed">Completion Status</option>
                        </select>
                        <select
                            className="border rounded px-2 py-1 mb-2 md:mb-0"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center">
                        <div className="md:w-1/2">
                            <div className="flex items-center">
                                <label htmlFor="itemsPerPage" className="mr-2">Items per page:</label>
                                <select
                                    id="itemsPerPage"
                                    className="border rounded px-2 py-1 mr-4"
                                    value={amountOfItems}
                                    onChange={(e) => {
                                        setAmountOfItems(Number(e.target.value));
                                        setPage(0); // Reset to first page when changing items per page
                                    }}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <span className="ml-4">
                                    Showing {filteredTotalCount > 0 ? `${startItem}-${endItem} of ${filteredTotalCount}` : '0'} items
                                </span>
                            </div>
                        </div>

                        <div className="md:w-1/2 mt-4 md:mt-0">
                            <div className="flex justify-start md:justify-end">
                                <div className="inline-flex rounded-md shadow-sm max-w-xs">
                                    <button
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:outline-none disabled:opacity-50"
                                        onClick={handlePrevPage}
                                        disabled={page === 0}
                                    >
                                        Previous
                                    </button>

                                    <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
                                        Page {page + 1} of {Math.max(1, totalPages)}
                                    </span>

                                    <button
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:outline-none disabled:opacity-50"
                                        onClick={handleNextPage}
                                        disabled={page >= totalPages - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {successMessage}
                </div>
            )}
            {/* pagination Controls */}
            {isLoading && !editingAnime ? (
                <Loading />
            ) : (
                <div>
                    {editingAnime ? (
                        <div className="bg-white rounded-lg shadow-md mb-6">
                            <div className="border-b px-4 py-2">
                                <h5 className="font-bold">Edit Anime</h5>
                            </div>
                            <div className="p-4">
                                <AnimeForm
                                    anime={editingAnime}
                                    onSubmit={handleSave}
                                    onCancel={handleCancelEdit}
                                />
                            </div>
                        </div>
                    ) : (
                        animeList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {animeList.map(anime => (
                                    <div key={anime._id} >
                                        <AnimeCard
                                            anime={anime}
                                            actionButton={
                                                <div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                                                            onClick={() => handleEdit(anime)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="bg-white hover:bg-red-100 text-red-500 border border-red-500 font-bold py-1 px-4 rounded"
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
                        ) : (
                            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4">
                                {searchTerm ? 'No anime matching your search. Try adjusting your search terms.' : 'Your anime list is empty. Go to the Search page to add anime!'}
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default MyAnimeList;