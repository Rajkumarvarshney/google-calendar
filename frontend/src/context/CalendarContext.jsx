import React, { createContext, useReducer, useContext } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { getWeekStart } from '../utils/dateUtils';

const CalendarContext = createContext();

const initialState = {
    today: new Date(),
    weekStart: getWeekStart(new Date()),
    selectedDate: new Date(),
    eventModal: false,
    taskModal: false,
    appointmentModal: false,
    festivals: [],
    holidays: [],
    isLoadingFestivals: false,
    countryCode: 'IN', // Default to India for Indian festivals
    currentView: 'month',
    showDeclined: true,
    showCompletedTasks: true,
    showWeekends: true,
    tempEvent: null,
};

function calendarReducer(state, action) {
    switch (action.type) {
        case 'SET_WEEK_START':
            return { ...state, weekStart: action.payload };
        case 'SET_SELECTED_DATE':
            return { ...state, selectedDate: action.payload };
        case 'OPEN_EVENT_MODAL':
            return { ...state, eventModal: true, taskModal: false, appointmentModal: false };
        case 'OPEN_TASK_MODAL':
            return { ...state, taskModal: true, eventModal: false, appointmentModal: false };
        case 'OPEN_APPOINTMENT_MODAL':
            return { ...state, appointmentModal: true, taskModal: false, eventModal: false };
        case 'CLOSE_ALL_MODALS':
            return { ...state, eventModal: false, taskModal: false, appointmentModal: false };
        case 'SET_FESTIVALS':
            return { ...state, festivals: action.payload, isLoadingFestivals: false };
        case 'SET_HOLIDAYS':
            return { ...state, holidays: action.payload };
        case 'SET_LOADING_FESTIVALS':
            return { ...state, isLoadingFestivals: action.payload };
        case 'SET_COUNTRY_CODE':
            return { ...state, countryCode: action.payload };
        case 'SET_MONTH_INDEX':
            return {
                ...state,
                monthIndex: action.payload,
            };
        case 'SET_YEAR':
            return {
                ...state,
                year: action.payload,
            };
        case 'SET_VIEW':
            return { ...state, currentView: action.payload };
        case 'TOGGLE_DECLINED':
            return { ...state, showDeclined: !state.showDeclined };
        case 'TOGGLE_COMPLETED':
            return { ...state, showCompletedTasks: !state.showCompletedTasks };
        case 'TOGGLE_WEEKENDS':
            return { ...state, showWeekends: !state.showWeekends };
        case 'SET_TEMP_EVENT':
            return { ...state, tempEvent: action.payload };
        case 'NEXT_MONTH':
            const nextDate = addMonths(new Date(state.year, state.monthIndex), 1);
            return {
                ...state,
                monthIndex: nextDate.getMonth(),
                year: nextDate.getFullYear(),
            };
        case 'PREV_MONTH':
            const prevDate = subMonths(new Date(state.year, state.monthIndex), 1);
            return {
                ...state,
                monthIndex: prevDate.getMonth(),
                year: prevDate.getFullYear(),
            };
        default:
            return state;
    }
}

export const CalendarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(calendarReducer, initialState);

    return (
        <CalendarContext.Provider value={{ state, dispatch }}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendarContext = () => {
    return useContext(CalendarContext);
};
