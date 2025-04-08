import React from 'react';

const AnimeCard = ({ anime, actionButton }) => {
    const title = anime.title || "Unknown Title";
    const coverImage = anime.coverImage?.original || null;
    const synopsis = anime.synopsis || "";
    const episodeCount = anime.episodeCount || 0;
    const watchedCount = anime.watchedEpisodes?.length || 0;

    const watchStatus = watchedCount > 0
        ? `${watchedCount}/${episodeCount || '?'} episodes watched`
        : 'Not started watching';

    const completionPercentage = Math.min(
        100,
        episodeCount > 0 ? Math.round((watchedCount / episodeCount) * 100) : 0
    );

    return (
        <div className="rounded overflow-hidden shadow-md border mb-4 w-full h-80"> {/* Stała wysokość */}
            <div className="flex flex-row w-full h-full">
                {/* Obrazek - 1/3 szerokości */}
                <div className="w-1/3 h-full flex items-center justify-start bg-gray-100">
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt={title}
                            className="object-contain max-h-full max-w-full mx-auto"
                        />
                    ) : (
                        <div className="bg-gray-400 text-white w-full h-full flex items-center justify-center text-center text-sm">
                            No Image
                        </div>
                    )}
                </div>

                {/* Tekst i inne informacje */}
                <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                        <h5 className="font-bold text-lg mb-1 line-clamp-1">{title}</h5>
                        <div className="mb-1">
                            <small className="text-gray-600">Episodes: {episodeCount || 'Unknown'}</small>
                            {anime.watchedEpisodes && (
                                <>
                                    <div className="text-xs text-gray-600">{watchStatus}</div>
                                    {episodeCount > 0 && (
                                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                            <div
                                                className="bg-blue-600 h-1 rounded-full"
                                                style={{ width: `${completionPercentage}%` }}
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        {synopsis && (
                            <p className="text-gray-700 text-sm line-clamp-2">{synopsis}</p>
                        )}
                        {anime.rating > 0 && (
                            <p className="mt-1 text-xs text-gray-600">My Rating: {anime.rating}/10</p>
                        )}
                    </div>

                    {actionButton && (
                        <div className="mt-2">
                            {actionButton}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimeCard;
