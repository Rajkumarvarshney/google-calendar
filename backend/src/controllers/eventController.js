const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const { start, end } = req.query;
        let query = {};

        if (start && end) {
            query = {
                start: { $gte: new Date(start) },
                end: { $lte: new Date(end) }
            };
        }

        const events = await Event.find(query);
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Public
const createEvent = async (req, res) => {
    try {
        const { title, description, start, end, location, color, recurrence } = req.body;

        const event = new Event({
            title,
            description,
            start,
            end,
            location,
            color,
            recurrence,
        });

        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Public
const updateEvent = async (req, res) => {
    try {
        const { title, description, start, end, location, color, recurrence } = req.body;
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = title || event.title;
            event.description = description || event.description;
            event.start = start || event.start;
            event.end = end || event.end;
            event.location = location || event.location;
            event.color = color || event.color;
            event.recurrence = recurrence || event.recurrence;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Public
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
