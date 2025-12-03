import React, { useState } from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
import { useUIContext } from '../../context/UIContext';
import Button from '../ui/Button';
import ViewSwitcher from '../ViewSwitcher';
import { format } from 'date-fns';

const Navbar = () => {
    const { state, dispatch } = useCalendarContext();
    const { isSidebarOpen, toggleSidebar, toggleSearch } = useUIContext();
    const [viewMenuOpen, setViewMenuOpen] = useState(false);

    const handlePrevMonth = () => {
        const prevDate = new Date(state.selectedDate);
        prevDate.setMonth(prevDate.getMonth() - 1);
        dispatch({ type: 'SET_SELECTED_DATE', payload: prevDate });
    };

    const handleNextMonth = () => {
        const nextDate = new Date(state.selectedDate);
        nextDate.setMonth(nextDate.getMonth() + 1);
        dispatch({ type: 'SET_SELECTED_DATE', payload: nextDate });
    };

    const handleToday = () => {
        dispatch({ type: 'SET_SELECTED_DATE', payload: new Date() });
    };

    const currentDate = new Date(
        state.selectedDate.getFullYear(),
        state.selectedDate.getMonth()
    );

    const viewLabel = {
        day: "Day",
        week: "Week",
        month: "Month",
        year: "Year",
        schedule: "Schedule",
        "4days": "4 days",
    }[state.currentView] || "Month";

    return (
        <header className="navbar toolbar-shell">
            <div className="navbar toolbar">

                {/* LEFT SIDE */}
                <div className="navbar-left">

                    {/* MENU BUTTON — NOW WORKING */}
                    <Button
                        variant="ghost"
                        onClick={toggleSidebar}
                        className="icon-btn-round"
                    >
                        <span className="material-icons-outlined">menu</span>
                    </Button>

                    {/* LOGO */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <img
                            src="/google.png"
                            alt="Calendar Logo"
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "4px",
                                objectFit: "cover",
                                display: "block"
                            }}
                        />
                        <span className="navbar-title">Calendar</span>
                    </div>
                </div>

                {/* CENTER SECTION */}
                <div className="navbar-center">
                    <div style={{ position: "relative", marginRight: "12px" }}>
                        <button
                            className="view-btn chip"
                            onClick={() => setViewMenuOpen(!viewMenuOpen)}
                        >
                            {viewLabel} ▾
                        </button>
                        <ViewSwitcher
                            open={viewMenuOpen}
                            onClose={() => setViewMenuOpen(false)}
                        />
                    </div>

                    <Button variant="secondary" onClick={handleToday} className="chip">
                        Today
                    </Button>

                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" onClick={handlePrevMonth} className="icon-btn-round">
                            <span className="material-icons-outlined">chevron_left</span>
                        </Button>
                        <Button variant="ghost" onClick={handleNextMonth} className="icon-btn-round">
                            <span className="material-icons-outlined">chevron_right</span>
                        </Button>
                    </div>

                    <h2 className="navbar-date">
                        {format(currentDate, 'MMMM d, yyyy')}
                    </h2>
                </div>

                {/* RIGHT SIDE */}
                <div className="navbar-right">
                    <Button
                        variant="ghost"
                        className="icon-btn-round"
                        onClick={toggleSearch}
                    >
                        <span className="material-icons-outlined">search</span>
                    </Button>

                    <Button variant="ghost" className="icon-btn-round">
                        <span className="material-icons-outlined">settings</span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
