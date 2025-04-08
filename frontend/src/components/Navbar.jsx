import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center space-x-6">
                    <Link
                        className="text-2xl font-semibold text-white hover:text-gray-300 transition"
                        to="/"
                    >
                        Anime Tracker
                    </Link>

                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                className="px-3 py-2 rounded hover:bg-gray-700 hover:text-white transition"
                                to="/"
                            >
                                My Anime List
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="px-3 py-2 rounded hover:bg-gray-700 hover:text-white transition"
                                to="/search"
                            >
                                Search Anime
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
