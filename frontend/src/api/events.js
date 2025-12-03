import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export const getEvents = async (start, end) => {
    try {
        const response = await axios.get(API_URL, {
            params: { start, end },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

export const updateEvent = async (id, eventData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

export const deleteEvent = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting event:', error);
        throw error;
    }
};

export const searchEvents = async (query) => {
    try {
        const response = await axios.get(API_URL);
        // Filter events on client side based on query
        const allEvents = response.data;
        const filteredEvents = allEvents.filter(event => {
            const searchTerm = query.toLowerCase();
            return (
                event.title?.toLowerCase().includes(searchTerm) ||
                event.description?.toLowerCase().includes(searchTerm) ||
                event.location?.toLowerCase().includes(searchTerm)
            );
        });
        return filteredEvents;
    } catch (error) {
        console.error('Error searching events:', error);
        throw error;
    }
};
