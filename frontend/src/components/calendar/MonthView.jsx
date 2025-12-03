import React from 'react';
import { useCalendarContext } from '../../context/CalendarContext';
// import { useFestivals } from '../../hooks/useFestivals';
import { getMonthMatrix } from '../../utils/dateUtils';
import { format, isSameDay, isSameMonth } from 'date-fns';
import { motion } from "framer-motion";

const MonthView = () => {
    const { state, dispatch } = useCalendarContext();
    const holidays = Array.isArray(state.holidays) ? state.holidays : [];
    // Derive current month from selectedDate
    const currentMonth = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth());
    const monthMatrix = getMonthMatrix(currentMonth);

    const handleDayClick = (day) => {
        dispatch({ type: 'SET_SELECTED_DATE', payload: day });
        // Optionally switch to day view or open modal
    };

    return (
        <div className="month-view">
            <div className="month-view-header">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                    <div key={`weekday-${i}`} className="month-view-day-label">
                        {day}
                    </div>
                ))}
            </div>

            <div className="month-view-grid">
                {monthMatrix.map((row, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        {row.map((day) => {
                            const isCurrentMonth = isSameMonth(day, currentMonth);
                            const isToday = isSameDay(day, new Date());
                            const isSelected = isSameDay(day, state.selectedDate);

                            // Find holidays/festivals for this day
                            const dayHolidays = holidays.filter(holiday => {
                                const holidayDate = new Date(holiday.date);
                                return isSameDay(holidayDate, day);
                            });

                            let className = 'month-view-day';
                            if (!isCurrentMonth) className += ' other-month';
                            if (isSelected) className += ' selected';
                            if (dayHolidays.length > 0) className += ' has-holiday';

                            // Use the ISO string as a stable, unique key for each day
                            const dayKey = day.toISOString();

                            // optional micro animation: slight stagger per day based on timestamp
                            const dayIndexForDelay = (rowIndex * 7) + row.indexOf(day);
                            const delay = Math.min(0.4, dayIndexForDelay * 0.02);

                            return (
                                <motion.div
                                    key={dayKey}
                                    className={className}
                                    onClick={() => handleDayClick(day)}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.18, delay }}
                                >
                                    <div className="day-header">
                                        <span className={`day-number ${isToday ? 'today' : ''}`}>
                                            {format(day, 'd')}
                                        </span>
                                        {isSelected && <div className="selected-chip" />}
                                    </div>

                                    {/* Display holidays/festivals */}
                                    {dayHolidays.length > 0 && (
                                        <div className="day-events">
                                            {dayHolidays.slice(0, 2).map((holiday) => (
                                                <div key={holiday.id} className="holiday-badge" title={holiday.title}>
                                                    {holiday.title}
                                                </div>
                                            ))}
                                            {dayHolidays.length > 2 && (
                                                <div className="more-events">+{dayHolidays.length - 2}</div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MonthView;
