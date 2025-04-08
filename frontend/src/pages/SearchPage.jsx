import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import AnimeCard from '../components/AnimeCard';
import Loading from '../components/Loading';
import AnimeForm from '../components/AnimeForm';

const AnimeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Pagination controls
    const [page, setPage] = useState(0);
    const [amountOfItems, setAmountOfItems] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    // Adding form controls
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedAnime, setSelectedAnime] = useState(null);
    // Sorting controls
    //when sorting adding - before param flips the order, therfore changing ascending/descending is daaing - before it
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('-');

    const handleSearch = async (e) => {
        e.preventDefault();
        // Reset page to 0 when performing a new search
        setPage(0);
        await fetchSearchResults();
    };

    //fonction that will count how many animes are for that search based on ling krom api
    function getTotalFromLastLink(lastLink) {
        const url = new URL(lastLink);
        const offset = parseInt(url.searchParams.get("page[offset]"), 10);
        const limit = parseInt(url.searchParams.get("page[limit]"), 10);
        return offset + limit;
    }

    const fetchSearchResults = useCallback(async () => {


        setIsLoading(true);
        setError(null);

        try {
            // Calculate offset based on page and amountOfItems normally it should be page*ammount but api has an error
            //I will describe error in documentation but this fix works for most of the cases
            //if api will get fixed this part should be fixed too
            //when sorting adding - before param flips the order, therfore changing ascending/descending is daaing - before it
            const offset = (page + 1) * amountOfItems;
            const data = await api.searchAnime(searchTerm, amountOfItems, offset, (sortBy ? sortOrder : "") + sortBy);

            //in bigger project i could add session manager and relevant anime data after logging in
            //for now i will fetch data here to filter out all the animes i have allrady added
            const dataBaseIDs = await api.getAllAnimeID();
            const savedIDs = new Set(dataBaseIDs.data);

            // Filter out anime that already exist in the database
            const filteredResults = (data.data || []).filter(anime => !savedIDs.has(anime._id));

            // Sorting alphabeticaly with canonicalTitle
            if (sortBy === "") {
                filteredResults.sort((a, b) => {
                    const titleA = a.title.toUpperCase();
                    const titleB = b.title.toUpperCase();

                    if (titleA < titleB) return -1;
                    if (titleA > titleB) return 1;
                    return 0;
                });
            }

            setSearchResults(filteredResults);
            setTotalCount(getTotalFromLastLink(data.links.last) || 0);
        } catch (err) {
            console.error('Error searching anime:', err);
            setError('Failed to search anime. Please try again later.');
            setSearchResults([]);
            setTotalCount(0);
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, page, amountOfItems, sortBy, sortOrder]);

    // Effect to fetch search results when pagination changes
    useEffect(() => {

        fetchSearchResults();

    }, [page, amountOfItems, fetchSearchResults]);


    const openForm = (anime) => {
        setSelectedAnime(anime);
        setIsFormOpen(true);
    };


    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedAnime(null);
    };

    const handleFormSubmit = async (animeData) => {
        setIsLoading(true);
        setError(null);

        try {
            await api.addAnime(animeData);

            setSuccessMessage(`"${animeData.title}" has been added to your list!`);

            setSearchResults(prevResults =>
                prevResults.filter(anime => anime._id !== animeData._id)
            );
        } catch (err) {
            console.error('Error adding anime:', err);
            setError('Failed to add anime. Please try again later.');
        } finally {
            setIsLoading(false);
            closeForm();
        }
    };


    // Calculate displayed range
    const startItem = page * amountOfItems + 1;
    const endItem = Math.min((page + 1) * amountOfItems, totalCount);

    return (
        <div className="container mx-auto px-4 my-8">
            <h1 className="text-2xl font-bold mb-4">Search Anime</h1>
            {/* search bar */}
            <form onSubmit={handleSearch} className="mb-6">
                <div className="flex flex-wrap">
                    <input
                        type="text"
                        className="w-full md:w-auto md:flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search for anime..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="w-full md:w-auto mt-2 md:mt-0 p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>
            {/* sort bar */}
            <div className="mb-6">
                <label htmlFor="sortBy" className="mr-2">Sort by:</label>
                <select
                    id="sortBy"
                    className="border rounded px-2 py-1"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="">Default</option>
                    <option value="popularityRank">Popularity</option>
                    <option value="ratingRank">Rating</option>
                    <option value="startDate">Start Date</option>
                </select>

                <select
                    className="border rounded px-2 py-1"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="-">Ascending</option>
                    <option value="">Descending</option>
                </select>

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
            {searchResults.length > 0 && (
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
                                            setPage(0);
                                        }}
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                    </select>

                                    {totalCount > 0 && (
                                        <span className="ml-4">
                                            Showing {startItem}-{endItem} of {totalCount}+ results
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="md:w-1/2 mt-4 md:mt-0">
                                <div className="flex justify-start md:justify-end">
                                    <div className="inline-flex rounded-md shadow-sm">
                                        <button
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:outline-none disabled:opacity-50"
                                            onClick={() => setPage(p => Math.max(0, p - 1))}
                                            disabled={page === 0 || isLoading}
                                        >
                                            Previous
                                        </button>

                                        <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-gray-300">
                                            Page {page + 1}
                                        </span>

                                        <button
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:outline-none disabled:opacity-50"
                                            onClick={() => setPage(p => p + 1)}
                                            disabled={endItem === totalCount}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* anime list */}
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {searchResults.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {searchResults.map(anime => (
                                <div key={anime._id}>
                                    <AnimeCard
                                        anime={anime}
                                        actionButton={
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                                                onClick={() => openForm(anime)}
                                            >
                                                Add to List
                                            </button>
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found</p>
                    )}


                    {isFormOpen && (
                        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                            <div
                                className={`bg-white p-6 rounded-lg shadow-lg w-[25%]`}
                            >
                                <AnimeForm
                                    anime={selectedAnime}
                                    onSubmit={handleFormSubmit}
                                    onCancel={closeForm}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AnimeSearch;