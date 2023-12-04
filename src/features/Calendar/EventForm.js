import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from './calendarSlice';

const EventForm = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [allDay, setAllDay] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create the event object
        const event = {
            title,
            start: startDate,
            end: endDate,
            allDay
        };

        // Dispatch the action to add the event
        dispatch(addEvent(event));

        // Reset the form
        setTitle('');
        setStartDate('');
        setEndDate('');
        setAllDay(false)
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 mb-2">
                        Event Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        placeholder="Enter event title"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-gray-700 mb-2">
                        Start Date:
                    </label>
                    <input
                        type="datetime-local"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="endDate" className="block text-gray-700 mb-2">
                        End Date:
                    </label>
                    <input
                        type="datetime-local"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
                        required
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="allDay" className="block text-gray-700 mr-2">
                        All Day Event:
                    </label>
                    <input
                        type="checkbox"
                        id="allDay"
                        checked={allDay}
                        onChange={(e) => setAllDay(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-purple-600"
                    />
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-700 text-white rounded-lg shadow transition-colors duration-300"
                    >
                        Add Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
