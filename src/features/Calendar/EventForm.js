import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from './calendarSlice'; // Import the action creator for adding events

const EventForm = () => {
    // State hooks for managing form inputs
    const [title, setTitle] = useState(''); // State for the event's title
    const [startDate, setStartDate] = useState(''); // State for the event's start date
    const [endDate, setEndDate] = useState(''); // State for the event's end date
    const [allDay, setAllDay] = useState(false); // State to toggle if the event is all day
    const dispatch = useDispatch(); // Hook to dispatch actions

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const event = { // Create an event object from state
            title,
            start: startDate,
            end: endDate,
            allDay
        };

        dispatch(addEvent(event)); // Dispatch the event to the Redux store

        // Reset form fields after submission
        setTitle('');
        setStartDate('');
        setEndDate('');
        setAllDay(false);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="title" className="block text-gray-700 mb-1">
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
                <div className="mb-1">
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
                <div className="mb-2">
                    <label htmlFor="endDate" className="block text-gray-700 mb-1">
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
                <div className="mb-2 flex items-center">
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
