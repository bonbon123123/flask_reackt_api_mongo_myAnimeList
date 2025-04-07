import React from 'react';

const Pagination = ({ links, onPageChange, currentPage }) => {
    const getPageNumber = (url) => {
        if (!url) return null;
        try {
            const urlObj = new URL(url);
            return parseInt(urlObj.searchParams.get('page[offset]')) /
                parseInt(urlObj.searchParams.get('page[limit]')) + 1;
        } catch (e) {
            return null;
        }
    };

    const firstPage = getPageNumber(links?.first);
    const lastPage = getPageNumber(links?.last);

    return (
        <nav aria-label="Anime pagination">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${!links?.first || currentPage === firstPage ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(links.first)}
                        disabled={!links?.first || currentPage === firstPage}
                    >
                        First
                    </button>
                </li>
                <li className={`page-item ${!links?.prev ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(links.prev)}
                        disabled={!links?.prev}
                    >
                        Previous
                    </button>
                </li>

                {currentPage && (
                    <li className="page-item active">
                        <span className="page-link">
                            {currentPage}
                            {lastPage && <span className="visually-hidden">(current)</span>}
                        </span>
                    </li>
                )}

                <li className={`page-item ${!links?.next ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(links.next)}
                        disabled={!links?.next}
                    >
                        Next
                    </button>
                </li>
                <li className={`page-item ${!links?.last || currentPage === lastPage ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(links.last)}
                        disabled={!links?.last || currentPage === lastPage}
                    >
                        Last
                    </button>
                </li>
            </ul>

            {lastPage && (
                <div className="text-center text-muted small mt-1">
                    Page {currentPage} of {lastPage}
                </div>
            )}
        </nav>
    );
};

export default Pagination;