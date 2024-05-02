import React from 'react';
import FullCalendar from '@fullcalendar/react'; // Main calendar component from FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin for showing events in a day grid view
import timeGridPlugin from '@fullcalendar/timegrid'; // Plugin for time grid capabilities
import interactionPlugin from '@fullcalendar/interaction'; // Plugin to enable interactive features like dragging and dropping
import { useSelector, useDispatch } from 'react-redux'; // Hooks for accessing Redux state and dispatching actions
import { selectEvents, updateEvent, deleteEvent } from './calendarSlice'; // Importing selectors and action creators
import './calendar.css'; // Styles specific to the calendar component
import EventForm from './EventForm'; // Component for adding new events

export default function Calendar() {
    // Accessing the list of events from the Redux store
    const events = useSelector(selectEvents);
    const dispatch = useDispatch(); // Hook to dispatch actions

    // Handler for when an event is moved to a new time/date
    const handleEventDrop = (info) => {
        const { event } = info;
    
        // Creating an updated event object from the dropped event's data
        const updatedEvent = {
            id: Number(event.id),
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: event.allDay
        };
    
        // Dispatching the updateEvent action with the new event details
        dispatch(updateEvent(updatedEvent));
    };

    // Handler for when an event is clicked which prompts the user for deletion
    const handleEventClick = ({ event }) => {
        // Confirm dialog to ensure user intent to delete
        if (window.confirm(`Are you sure you want to delete the event '${event.title}'?`)) {
            // Dispatching the deleteEvent action with the event's ID
            dispatch(deleteEvent({ id: Number(event.id) }));
        }
    };

    // Component rendering
    return (
        <div className="flex m-4">
            <div className='w-3/4 h-3/4 m-1'>
                <div className='p-4 bg-white rounded-lg shadow'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Plugins used in the calendar
                        initialView='dayGridMonth' // Default view when the calendar loads
                        events={events} // Events to be rendered
                        editable={true} // Allows editing of events via drag-and-drop
                        eventDrop={handleEventDrop} // Handler for dropping events
                        eventClick={handleEventClick} // Handler for clicking events
                    />
                </div>
            </div>
            <div className='w-1/4 h-full m-1'>
                <div className='mb-2'>
                    <EventForm /> {/*Form for adding new events*/}
                </div>
                {/* Uncomment the below section to add an additional calendar view if needed */}
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
