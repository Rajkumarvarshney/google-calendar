import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, addDays } from 'date-fns';

export const getWeekStart = (date = new Date()) => {
    return startOfWeek(date, { weekStartsOn: 0 }); // Sunday as week start
};

export const getMonthMatrix = (date = new Date()) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    const matrix = [];
    let currentDay = startDate;

    // Create a 2D array (weeks x days)
    // Standard calendar view usually has 5 or 6 weeks
    while (currentDay <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            week.push(currentDay);
            currentDay = addDays(currentDay, 1);
        }
        matrix.push(week);
    }

    return matrix;
};

export const formatDate = (date, formatStr = 'MMMM yyyy') => {
    return format(date, formatStr);
};
