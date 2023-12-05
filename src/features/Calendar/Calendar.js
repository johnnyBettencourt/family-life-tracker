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
        const { event } = info;
    
        const updatedEvent = {
            id: Number(event.id),
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay
        };
    
        dispatch(updateEvent(updatedEvent));
    };

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
