import axios from 'axios';

// Using Nager.Date API for Indian public holidays (free, no API key required)
const HOLIDAYS_API = 'https://date.nager.at/api/v3';

// Indian Festivals Data - Major festivals with approximate dates
// Note: Many Indian festivals are based on lunar calendar, so dates vary each year
// This is a comprehensive list of major Indian festivals
const INDIAN_FESTIVALS = {
    2024: [
        { name: 'Makar Sankranti', date: '2024-01-15', type: 'festival' },
        { name: 'Republic Day', date: '2024-01-26', type: 'holiday' },
        { name: 'Vasant Panchami', date: '2024-02-14', type: 'festival' },
        { name: 'Maha Shivaratri', date: '2024-03-08', type: 'festival' },
        { name: 'Holi', date: '2024-03-25', type: 'festival' },
        { name: 'Ram Navami', date: '2024-04-17', type: 'festival' },
        { name: 'Hanuman Jayanti', date: '2024-04-23', type: 'festival' },
        { name: 'Akshaya Tritiya', date: '2024-05-10', type: 'festival' },
        { name: 'Eid ul-Fitr', date: '2024-04-11', type: 'festival' },
        { name: 'Buddha Purnima', date: '2024-05-23', type: 'festival' },
        { name: 'Rath Yatra', date: '2024-07-07', type: 'festival' },
        { name: 'Guru Purnima', date: '2024-07-21', type: 'festival' },
        { name: 'Raksha Bandhan', date: '2024-08-19', type: 'festival' },
        { name: 'Independence Day', date: '2024-08-15', type: 'holiday' },
        { name: 'Janmashtami', date: '2024-08-26', type: 'festival' },
        { name: 'Ganesh Chaturthi', date: '2024-09-07', type: 'festival' },
        { name: 'Onam', date: '2024-09-05', type: 'festival' },
        { name: 'Navratri', date: '2024-10-03', type: 'festival' },
        { name: 'Dussehra', date: '2024-10-12', type: 'festival' },
        { name: 'Karva Chauth', date: '2024-11-01', type: 'festival' },
        { name: 'Diwali', date: '2024-11-01', type: 'festival' },
        { name: 'Govardhan Puja', date: '2024-11-02', type: 'festival' },
        { name: 'Bhai Dooj', date: '2024-11-03', type: 'festival' },
        { name: 'Chhath Puja', date: '2024-11-07', type: 'festival' },
        { name: 'Guru Nanak Jayanti', date: '2024-11-15', type: 'festival' },
        { name: 'Christmas', date: '2024-12-25', type: 'holiday' },
    ],
    2025: [
        { name: 'Makar Sankranti', date: '2025-01-14', type: 'festival' },
        { name: 'Republic Day', date: '2025-01-26', type: 'holiday' },
        { name: 'Vasant Panchami', date: '2025-02-02', type: 'festival' },
        { name: 'Maha Shivaratri', date: '2025-02-26', type: 'festival' },
        { name: 'Holi', date: '2025-03-14', type: 'festival' },
        { name: 'Ram Navami', date: '2025-04-06', type: 'festival' },
        { name: 'Hanuman Jayanti', date: '2025-04-12', type: 'festival' },
        { name: 'Akshaya Tritiya', date: '2025-04-30', type: 'festival' },
        { name: 'Eid ul-Fitr', date: '2025-03-31', type: 'festival' },
        { name: 'Buddha Purnima', date: '2025-05-12', type: 'festival' },
        { name: 'Rath Yatra', date: '2025-06-27', type: 'festival' },
        { name: 'Guru Purnima', date: '2025-07-10', type: 'festival' },
        { name: 'Raksha Bandhan', date: '2025-08-09', type: 'festival' },
        { name: 'Independence Day', date: '2025-08-15', type: 'holiday' },
        { name: 'Janmashtami', date: '2025-08-15', type: 'festival' },
        { name: 'Ganesh Chaturthi', date: '2025-08-27', type: 'festival' },
        { name: 'Onam', date: '2025-08-26', type: 'festival' },
        { name: 'Navratri', date: '2025-09-22', type: 'festival' },
        { name: 'Dussehra', date: '2025-10-02', type: 'festival' },
        { name: 'Karva Chauth', date: '2025-10-20', type: 'festival' },
        { name: 'Diwali', date: '2025-10-20', type: 'festival' },
        { name: 'Govardhan Puja', date: '2025-10-21', type: 'festival' },
        { name: 'Bhai Dooj', date: '2025-10-22', type: 'festival' },
        { name: 'Chhath Puja', date: '2025-10-27', type: 'festival' },
        { name: 'Guru Nanak Jayanti', date: '2025-11-05', type: 'festival' },
        { name: 'Christmas', date: '2025-12-25', type: 'holiday' },
    ],
};

/**
 * Get Indian festivals for a specific year
 */
const getIndianFestivals = (year) => {
    const festivals = INDIAN_FESTIVALS[year] || INDIAN_FESTIVALS[2024];
    return festivals.map(festival => ({
        id: `festival-${festival.date}-${festival.name}`,
        title: festival.name,
        date: new Date(festival.date),
        type: festival.type,
        localName: festival.name,
        countryCode: 'IN',
    }));
};

/**
 * Fetch public holidays for India
 * @param {string} countryCode - Should be 'IN' for India
 * @param {number} year - Year to fetch holidays for
 */
export const getPublicHolidays = async (countryCode = 'IN', year = new Date().getFullYear()) => {
    try {
        // Fetch public holidays from API
        const response = await axios.get(`${HOLIDAYS_API}/PublicHolidays/${year}/${countryCode}`);
        const data = response && response.data;

        if (!Array.isArray(data)) {
            console.warn('Unexpected holidays API response format', {
                status: response?.status,
                statusText: response?.statusText,
                data: data,
            });
            // Fallback: just return Indian festivals for the year
            const festivals = getIndianFestivals(year);
            // Keep behavior consistent and return combined list (no public holidays)
            return [...festivals].sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        const publicHolidays = data.map(holiday => ({
            id: `holiday-${holiday.date}`,
            title: holiday.name,
            date: new Date(holiday.date),
            type: 'holiday',
            localName: holiday.localName,
            countryCode: holiday.countryCode,
        }));

        // Add Indian festivals
        const festivals = getIndianFestivals(year);

        // Combine and sort by date
        const allEvents = [...publicHolidays, ...festivals].sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );

        return allEvents;
    } catch (error) {
        console.error('Error fetching Indian holidays:', {
            message: error?.message,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            data: error?.response?.data,
        });
        // Fallback to festivals list if API fails
        return getIndianFestivals(year);
    }
};

/**
 * Fetch upcoming Indian festivals and holidays for the next N days
 */
export const getUpcomingHolidays = async (countryCode = 'IN', days = 30) => {
    try {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        
        const [currentYearHolidays, nextYearHolidays] = await Promise.all([
            getPublicHolidays(countryCode, currentYear),
            getPublicHolidays(countryCode, nextYear),
        ]);

        const allHolidays = [...currentYearHolidays, ...nextYearHolidays];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const futureDate = new Date(today);
        futureDate.setDate(futureDate.getDate() + days);

        return allHolidays
            .filter(holiday => {
                const holidayDate = new Date(holiday.date);
                holidayDate.setHours(0, 0, 0, 0);
                return holidayDate >= today && holidayDate <= futureDate;
            })
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 15); // Return top 15 upcoming Indian festivals
    } catch (error) {
        console.error('Error fetching upcoming Indian festivals:', error);
        return [];
    }
};

/**
 * Get Indian festivals and holidays for a specific month
 */
export const getHolidaysForMonth = async (countryCode = 'IN', year, month) => {
    try {
        const holidays = await getPublicHolidays(countryCode, year);
        return holidays.filter(holiday => {
            const holidayDate = new Date(holiday.date);
            return holidayDate.getMonth() === month;
        });
    } catch (error) {
        console.error('Error fetching Indian festivals for month:', error);
        return [];
    }
};

/**
 * Get available countries for holidays API
 * For Indian festivals, we'll return India-focused options
 */
export const getAvailableCountries = async () => {
    try {
        const response = await axios.get(`${HOLIDAYS_API}/AvailableCountries`);
        const countries = Array.isArray(response?.data) ? response.data : [];
        if (!Array.isArray(response?.data)) {
            console.warn('Unexpected AvailableCountries response format', {
                status: response?.status,
                statusText: response?.statusText,
                data: response?.data,
            });
        }
        // Put India first
        const indiaIndex = countries.findIndex(c => c.countryCode === 'IN');
        if (indiaIndex > 0) {
            const [india] = countries.splice(indiaIndex, 1);
            countries.unshift(india);
        }
        return countries.length ? countries : [{ name: 'India', countryCode: 'IN' }];
    } catch (error) {
        console.error('Error fetching available countries:', {
            message: error?.message,
            status: error?.response?.status,
            statusText: error?.response?.statusText,
            data: error?.response?.data,
        });
        // Return India as default
        return [{ name: 'India', countryCode: 'IN' }];
    }
};

// For festivals and events, you might want to integrate with other APIs:
// - Eventbrite API (requires API key)
// - Eventful API
// - AllEvents API
// - Local Events API

/**
 * Get Indian festivals for a date range
 */
export const getFestivals = async (location = 'IN', startDate, endDate) => {
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const year = start.getFullYear();
        
        const festivals = await getPublicHolidays('IN', year);
        
        return festivals.filter(festival => {
            const festivalDate = new Date(festival.date);
            return festivalDate >= start && festivalDate <= end;
        });
    } catch (error) {
        console.error('Error fetching Indian festivals:', error);
        return [];
    }
};
