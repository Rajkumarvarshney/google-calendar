import React, { useState, useEffect } from 'react';
import { useUIContext } from '../../context/UIContext';
import { useCalendarContext } from '../../context/CalendarContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { format } from 'date-fns';
import { createEvent } from '../../api/events';
import { motion, AnimatePresence } from 'framer-motion';

const EventModal = () => {
    const { isEventModalOpen, closeEventModal, selectedEvent } = useUIContext();
    const { state } = useCalendarContext();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');
    const [color, setColor] = useState('#3788d8');

    useEffect(() => {
        if (selectedEvent) {
            setTitle(selectedEvent.title);
            setDescription(selectedEvent.description || '');
        } else {
            setTitle('');
            setDescription('');
            setStartTime('09:00');
            setEndTime('10:00');
            setColor('#3788d8');
        }
    }, [selectedEvent, isEventModalOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startDateTime = new Date(state.selectedDate);
        const [startHour, startMinute] = startTime.split(':');
        startDateTime.setHours(parseInt(startHour), parseInt(startMinute));

        const endDateTime = new Date(state.selectedDate);
        const [endHour, endMinute] = endTime.split(':');
        endDateTime.setHours(parseInt(endHour), parseInt(endMinute));

        const eventData = {
            title,
            description,
            start: startDateTime,
            end: endDateTime,
            color,
        };

        try {
            await createEvent(eventData);
            closeEventModal();
        } catch (error) {
            alert('Failed to save event');
        }
    };

    const colorOptions = [
        { label: 'Blue', value: '#3788d8' },
        { label: 'Red', value: '#d50000' },
        { label: 'Green', value: '#0b8043' },
        { label: 'Yellow', value: '#f6bf26' },
        { label: 'Purple', value: '#8e24aa' },
    ];

    return (
        <AnimatePresence>
            {isEventModalOpen && (
                <div className="modal-overlay">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="modal-content"
                    >
                        <div className="modal-header">
                            <h3 className="modal-title">
                                {selectedEvent ? 'Edit Event' : 'Create Event'}
                            </h3>
                            <button onClick={closeEventModal} className="modal-close-btn">
                                <span className="material-icons-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="modal-body">
                            <Input
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Add title"
                                required
                                autoFocus
                            />

                            <div className="modal-row">
                                <span className="material-icons-outlined">schedule</span>
                                <span>{format(state.selectedDate, 'EEEE, MMMM d')}</span>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="input-field"
                                    style={{ width: 'auto', padding: '4px' }}
                                />
                                <span>-</span>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="input-field"
                                    style={{ width: 'auto', padding: '4px' }}
                                />
                            </div>

                            <Input
                                label="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add description"
                            />

                            <div style={{ marginBottom: '16px' }}>
                                <label className="input-label">Color</label>
                                <div className="color-picker">
                                    {colorOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setColor(opt.value)}
                                            className={`color-option ${color === opt.value ? 'selected' : ''}`}
                                            style={{ backgroundColor: opt.value }}
                                            title={opt.label}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <Button type="button" variant="ghost" onClick={closeEventModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="primary">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EventModal;
