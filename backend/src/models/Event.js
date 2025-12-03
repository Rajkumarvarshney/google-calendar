const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
    },
    color: {
        type: String,
        default: '#3788d8', // Default blue
    },
    recurrence: {
        type: Object, // Flexible for now: { frequency: 'weekly', interval: 1, daysOfWeek: [1, 3] }
        default: null,
    },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
