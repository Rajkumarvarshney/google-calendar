import React, { createContext, useState, useContext } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const openEventModal = (event = null) => {
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const closeEventModal = () => {
        setSelectedEvent(null);
        setIsEventModalOpen(false);
    };

    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
    const closeSearch = () => setIsSearchOpen(false);

    return (
        <UIContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,
                isEventModalOpen,
                openEventModal,
                closeEventModal,
                selectedEvent,
                isSearchOpen,
                toggleSearch,
                closeSearch,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};

export const useUIContext = () => {
    return useContext(UIContext);
};
