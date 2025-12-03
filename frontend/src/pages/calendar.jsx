import React, { useState } from 'react';
import { useCalendarContext } from '../context/CalendarContext';
import { useFestivals } from '../hooks/useFestivals';
import Navbar from '../components/Navbar';
import Sidebar from "../components/layout/Sidebar";
import SidebarApps from "../components/SidebarApps";
import AppPanel from "../components/AppPanel";

import DayView from '../views/DayView';
import WeekView from '../views/WeekView';
import MonthView from '../views/MonthView';
import YearView from '../views/YearView';
import ScheduleView from '../views/ScheduleView';
import EventModal from '../components/EventModal';
import TaskModal from '../components/TaskModal';
import AppointmentModal from '../components/AppointmentModal';
import SearchBar from '../components/SearchBar';

const CalendarPage = () => {
    const { state } = useCalendarContext();
    const [openedApp, setOpenedApp] = useState(null);
    useFestivals();

    return (
        <div className="calendar-layout">
            <SidebarApps openApp={setOpenedApp} />
            <AppPanel app={openedApp} close={() => setOpenedApp(null)} />

            <div className="app-shell">
                <Navbar />
                <div className="app-content">
                    <Sidebar />
                    <main className="calendar-main app-canvas" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
                        {state.currentView === "day" && <DayView />}
                        {state.currentView === "week" && <WeekView />}
                        {state.currentView === "month" && <MonthView />}
                        {state.currentView === "year" && <YearView />}
                        {state.currentView === "schedule" && <ScheduleView />}
                        {state.eventModal && <EventModal />}
                        {state.taskModal && <TaskModal />}
                        {state.appointmentModal && <AppointmentModal />}
                        <SearchBar />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
