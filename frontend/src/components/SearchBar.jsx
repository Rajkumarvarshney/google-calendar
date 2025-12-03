import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIContext } from '../context/UIContext';
import { searchEvents } from '../api/events';
import { format } from 'date-fns';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

const SearchBar = () => {
    const { isSearchOpen, closeSearch } = useUIContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const performSearch = async () => {
            if (searchQuery.trim().length === 0) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const results = await searchEvents(searchQuery);
                setSearchResults(results);
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            performSearch();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleResultClick = (event) => {
        // You can navigate to the event or open it in a modal
        console.log('Selected event:', event);
        closeSearch();
    };

    return (
        <AnimatePresence>
            {isSearchOpen && (
                <motion.div
                    className="search-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeSearch}
                >
                    <motion.div
                        className="search-container"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="search-header">
                            <div className="search-input-wrapper">
                                <AiOutlineSearch className="search-icon" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="search-input"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button className="search-close-btn" onClick={closeSearch}>
                                <AiOutlineClose />
                            </button>
                        </div>

                        <div className="search-results">
                            {isLoading && (
                                <div className="search-loading">Searching...</div>
                            )}

                            {!isLoading && searchQuery.trim().length === 0 && (
                                <div className="search-empty">
                                    <p>Start typing to search for events</p>
                                </div>
                            )}

                            {!isLoading && searchQuery.trim().length > 0 && searchResults.length === 0 && (
                                <div className="search-empty">
                                    <p>No events found matching "{searchQuery}"</p>
                                </div>
                            )}

                            {!isLoading && searchResults.length > 0 && (
                                <div className="search-results-list">
                                    {searchResults.map((event) => (
                                        <div
                                            key={event._id || event.id}
                                            className="search-result-item"
                                            onClick={() => handleResultClick(event)}
                                        >
                                            <div className="result-title">{event.title}</div>
                                            {event.location && (
                                                <div className="result-location">{event.location}</div>
                                            )}
                                            {event.start && (
                                                <div className="result-date">
                                                    {format(new Date(event.start), 'MMM d, yyyy h:mm a')}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchBar;

