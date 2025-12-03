import { useEffect } from 'react';
import { useCalendarContext } from '../context/CalendarContext';
import { getPublicHolidays, getHolidaysForMonth, getUpcomingHolidays } from '../api/festivals';

/**
 * Custom hook to fetch and manage festivals/holidays
 */
export const useFestivals = () => {
    const { state, dispatch } = useCalendarContext();
    const { selectedDate, countryCode } = state;

    // Fetch holidays for the current month
    useEffect(() => {
        const fetchHolidays = async () => {
            dispatch({ type: 'SET_LOADING_FESTIVALS', payload: true });
            
            try {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth();
                
                // Fetch holidays for current month
                const holidays = await getHolidaysForMonth(countryCode, year, month);
                dispatch({ type: 'SET_HOLIDAYS', payload: holidays });

                // Also fetch upcoming holidays for the next 30 days
                const upcoming = await getUpcomingHolidays(countryCode, 30);
                dispatch({ type: 'SET_FESTIVALS', payload: upcoming });
            } catch (error) {
                console.error('Error fetching festivals:', error);
                dispatch({ type: 'SET_LOADING_FESTIVALS', payload: false });
            }
        };

        fetchHolidays();
    }, [selectedDate, countryCode, dispatch]);

    return {
        festivals: state.festivals,
        holidays: state.holidays,
        isLoadingFestivals: state.isLoadingFestivals,
        countryCode: state.countryCode,
    };
};

