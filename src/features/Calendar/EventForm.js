import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, editEvent, removeEvent } from './calendarSlice';

function formatDateToInput(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const EventForm = ({ event = null, clearSelectedEvent }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [allDay, setAllDay] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (event) {
            setTitle(event.title);
            setStartDate(formatDateToInput(event.start));
            setEndDate(formatDateToInput(event.end));
            setAllDay(event.allDay);
        } else {
            setTitle('');
            setStartDate('');
            setEndDate('');
            setAllDay(false);
        }
    }, [event]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = {
            id: event ? event.id : Date.now(),
            title,
            start: startDate,
            end: endDate,
            allDay
        };

        if (event) {
            dispatch(editEvent(newEvent));
            clearSelectedEvent();
        } else {
            dispatch(addEvent(newEvent));
        }

        setTitle('');
        setStartDate('');
        setEndDate('');
        setAllDay(false);
    };

    const handleDelete = () => {
        dispatch(removeEvent(event));
        clearSelectedEvent();
    }

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
                        {event ? 'Update Event' : 'Add Event'}
                    </button>
                    {event && (
                    <button
                    type="button"
                    className="px-4 py-2 bg-red-500 hover:bg-purple-700 text-white rounded-lg shadow transition-colors duration-300 ml-5"
                    onClick={handleDelete}
                    >
                        Delete Event
                    </button>
                )}
                </div>
                
            </form>
        </div>
    );
};

export default EventForm;
