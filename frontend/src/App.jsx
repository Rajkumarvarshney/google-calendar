import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CalendarPage from './pages/calendar';
import { CalendarProvider } from './context/CalendarContext';
import { UIProvider } from './context/UIContext';
import './styles/global.css';

function App() {
  return (
    <CalendarProvider>
      <UIProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/calendar" replace />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </Router>
      </UIProvider>
    </CalendarProvider>
  );
}

export default App;
