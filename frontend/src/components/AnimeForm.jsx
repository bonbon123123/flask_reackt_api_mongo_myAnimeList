import React, { useState, useEffect } from 'react';

const AnimeForm = ({ anime, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setFormData({
            ...anime,
            watchedEpisodes: Array.isArray(anime.watchedEpisodes)
                ? anime.watchedEpisodes.join(', ')
                : anime.watchedEpisodes || '',
            startedWatching: anime.startedWatching
                ? new Date(anime.startedWatching).toISOString().split('T')[0]
                : '',
            finishedWatching: anime.finishedWatching
                ? new Date(anime.finishedWatching).toISOString().split('T')[0]
                : ''
        });
    }, [anime]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const processedData = {
            ...formData,
            watchedEpisodes: formData.watchedEpisodes
                .split(',')
                .map(episode => parseInt(episode.trim()))
                .filter(ep => !isNaN(ep)),
            rating: parseInt(formData.rating),
        };

        onSubmit(processedData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <div className="form-control-plaintext">{formData.title}</div>
            </div>

            <div className="mb-3">
                <label className="form-label">Episode Count</label>
                <div className="form-control-plaintext">{formData.episodeCount}</div>
            </div>


            <div className="mb-3">
                <label htmlFor="watchedEpisodes" className="form-label">Watched Episodes</label>
                <input
                    type="text"
                    className="form-control"
                    id="watchedEpisodes"
                    name="watchedEpisodes"
                    value={formData.watchedEpisodes}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="completed"
                    name="completed"
                    checked={formData.completed || false}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="completed">Completed</label>
            </div>

            <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating (0-10)</label>
                <input
                    type="number"
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={formData.rating || 0}
                    onChange={handleChange}
                    min="0"
                    max="10"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="startedWatching" className="form-label">Started Watching</label>
                <input
                    type="date"
                    className="form-control"
                    id="startedWatching"
                    name="startedWatching"
                    value={formData.startedWatching}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="finishedWatching" className="form-label">Finished Watching</label>
                <input
                    type="date"
                    className="form-control"
                    id="finishedWatching"
                    name="finishedWatching"
                    value={formData.finishedWatching}
                    onChange={handleChange}
                />
            </div>

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default AnimeForm;
