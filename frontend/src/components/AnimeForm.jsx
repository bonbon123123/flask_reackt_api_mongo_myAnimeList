import React, { useState, useEffect } from 'react';

const AnimeForm = ({ anime, onSubmit, onCancel }) => {
    const today = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        watchedEpisodes: [],
        completed: false,
        rating: 0,
        startedWatching: today,
        finishedWatching: today,
        title: '',
        episodeCount: 0
    });

    useEffect(() => {
        if (anime) {
            setFormData({
                ...anime,
                watchedEpisodes: Array.isArray(anime.watchedEpisodes)
                    ? anime.watchedEpisodes
                    : [],
                startedWatching: anime.startedWatching
                    ? new Date(anime.startedWatching).toISOString().split('T')[0]
                    : today,
                finishedWatching: anime.finishedWatching
                    ? new Date(anime.finishedWatching).toISOString().split('T')[0]
                    : today
            });
        }
    }, [anime, today]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'completed') {
                setFormData({
                    ...formData,
                    completed: checked,
                    watchedEpisodes: checked
                        ? Array.from({ length: formData.episodeCount }, (_, i) => i + 1)
                        : [],
                });
            } else {
                const episodeNumber = parseInt(value);
                setFormData({
                    ...formData,
                    watchedEpisodes: checked
                        ? [...formData.watchedEpisodes, episodeNumber]
                        : formData.watchedEpisodes.filter(ep => ep !== episodeNumber),
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const processedData = {
            ...formData,
            watchedEpisodes: formData.watchedEpisodes,
            rating: parseInt(formData.rating),
        };

        onSubmit(processedData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <div className="text-gray-700">{formData.title}</div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Episode Count</label>
                <div className="text-gray-700">{formData.episodeCount}</div>
            </div>

            <div className="mb-4">
                <label htmlFor="watchedEpisodes" className="block text-gray-700 text-sm font-bold mb-2">
                    Watched Episodes
                </label>

                <div
                    className={`grid grid-cols-12 gap-1 max-h-[50vh] overflow-y-auto p-1`}
                >
                    {Array.from({ length: formData.episodeCount }, (_, i) => i + 1).map((episode) => (
                        <label key={episode} className="flex flex-col items-center">
                            <div className="mr-2">
                                {episode}
                            </div>
                            <input
                                type="checkbox"
                                value={episode}
                                checked={formData.watchedEpisodes.includes(episode)}
                                onChange={handleChange}
                                className="mr-2"
                            />
                        </label>
                    ))}
                </div>
            </div>




            <div className="mb-4 flex items-center">
                <input
                    type="checkbox"
                    className="mr-2"
                    id="completed"
                    name="completed"
                    checked={formData.completed || false}
                    onChange={handleChange}
                />
                <label className="text-gray-700 text-sm font-bold" htmlFor="completed">
                    Completed
                </label>
            </div>

            <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
                    Rating (0-10)
                </label>
                <input
                    type="number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="rating"
                    name="rating"
                    value={formData.rating || 0}
                    onChange={handleChange}
                    min="0"
                    max="10"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="startedWatching" className="block text-gray-700 text-sm font-bold mb-2">
                    Started Watching
                </label>
                <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="startedWatching"
                    name="startedWatching"
                    value={formData.startedWatching}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="finishedWatching" className="block text-gray-700 text-sm font-bold mb-2">
                    Finished Watching
                </label>
                <input
                    type="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="finishedWatching"
                    name="finishedWatching"
                    value={formData.finishedWatching}
                    onChange={handleChange}
                />
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Save
                </button>
                <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AnimeForm;
