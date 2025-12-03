import React from 'react';
import { motion } from 'framer-motion';
import MonthView from './MonthView';
import { useCalendarContext } from '../../context/CalendarContext';

const CalendarGrid = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
            <MonthView />
        </motion.div>
    );
};

export default CalendarGrid;
