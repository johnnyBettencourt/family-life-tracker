import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector, useDispatch } from 'react-redux';
import { selectEvents, updateEvent, deleteEvent } from './calendarSlice';
import './calendar.css';
import EventForm from './EventForm';

export default function Calendar() {
    // Fetch events from Redux store
    const events = useSelector(selectEvents);
    const dispatch = useDispatch();

    const handleEventDrop = (info) => {
        console.log(events);
        const { event } = info;
        const adjustedStart = toLocalISOString(event.start);
        const adjustedEnd = toLocalISOString(event.end);

        console.log(event.id);
    
        const updatedEvent = {
            id: Number(event.id),
            title: event.title,
            start: adjustedStart,
            end: adjustedEnd,
            allDay: event.allDay
        };
    
        dispatch(updateEvent(updatedEvent));
        console.log(events)
    };
    
    // Function to convert date to local ISO string
    function toLocalISOString(date) {
        const offset = date.getTimezoneOffset() * 60000; // offset in milliseconds
        const adjustedDate = new Date(date.getTime() - offset);
        return adjustedDate.toISOString().slice(0, 19); // Removes the 'Z' and milliseconds
    }

    const handleEventClick = ({ event }) => {
        if (window.confirm(`Are you sure you want to delete the event '${event.title}'?`)) {
            dispatch(deleteEvent({ id: Number(event.id) }));
        }
    };

    return (
        <div className="flex m-4">
            <div className='w-3/4 h-3/4 m-1'>
                <div className='p-4 bg-white rounded-lg shadow'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView='dayGridMonth'
                        events={events}
                        editable={true}
                        eventDrop={handleEventDrop}
                        eventClick={handleEventClick}
                    />
                </div>
            </div>
            <div className='w-1/4 h-full m-1'>
                
                <div className='mb-2'>
                    <EventForm />
                </div>
                {/* <div className='p-4 bg-white rounded-lg shadow'>
                    <FullCalendar
                        plugins={[listPlugin, interactionPlugin]}
                        initialView='listWeek'
                        events={events}
                    />
                </div> */}
            </div>
        </div>
    );
}
