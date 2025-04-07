import React from 'react';

const AnimeCard = ({ anime, actionButton }) => {
    // Get title - no need to check format anymore as server provides consistent format
    const title = anime.title || "Unknown Title";

    // Get cover image URL
    const coverImage =
        (anime.coverImage?.tiny || anime.coverImage?.original || null);

    // Get synopsis and episode count
    const synopsis = anime.synopsis || "";
    const episodeCount = anime.episodeCount || 0;

    // Handle watched episodes display
    const watchedCount = anime.watchedEpisodes?.length || 0;
    const watchStatus = watchedCount > 0
        ? `${watchedCount}/${episodeCount || '?'} episodes watched`
        : 'Not started watching';

    // Calculate completion percentage
    const completionPercentage = (episodeCount > 0 ? Math.round((watchedCount / episodeCount) * 100) : 0) > 100 ? 100 : Math.round((watchedCount / episodeCount) * 100);
    console.log(completionPercentage)
    return (
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            className="img-fluid rounded-start"
                            alt={title}
                            style={{ height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div
                            className="bg-secondary h-100 d-flex align-items-center justify-content-center text-white"
                            style={{ minHeight: '150px' }}
                        >
                            No Image
                        </div>
                    )}
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>

                        <div className="card-text mb-2">
                            <small className="text-muted">Episodes: {episodeCount || 'Unknown'}</small>
                            {anime.watchedEpisodes && (
                                <div className="mt-1">
                                    <small className="text-muted">{watchStatus}</small>
                                    {episodeCount > 0 && (
                                        <div className="progress mt-1" style={{ height: '5px' }}>
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: `${completionPercentage}%` }}
                                                aria-valuenow={completionPercentage}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            ></div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {synopsis && (
                            <p className="card-text" style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: '3',
                                WebkitBoxOrient: 'vertical'
                            }}>
                                {synopsis}
                            </p>
                        )}

                        {anime.rating > 0 && (
                            <p className="card-text">
                                <small className="text-muted">My Rating: {anime.rating}/10</small>
                            </p>
                        )}

                        {actionButton && (
                            <div className="mt-2">
                                {actionButton}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeCard;