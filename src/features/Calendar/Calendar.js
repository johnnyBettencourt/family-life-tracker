import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { useSelector } from 'react-redux';
import { selectEvents } from './calendarSlice';
import EventForm from './EventForm';
import './calendar.css'

const Calendar = () => {
    const events = useSelector(selectEvents);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };
    const handleUnselect = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="flex m-4">
            <div className='w-3/4 h-3/4 m-1'>
                <div className='p-4 bg-white rounded-lg shadow'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        events={events}
                        eventClick={handleEventClick}
                        unselect={handleUnselect}
                    />
                </div>
            </div>
            <div className='w-1/4 h-full m-1'>
                <div className='mb-2'>
                    <EventForm event={selectedEvent} />
                </div>
                <div className='p-4 bg-white rounded-lg shadow'>
                    <FullCalendar
                        plugins={[listPlugin]}
                        initialView='listWeek'
                        events={events}
                        eventClick={handleEventClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Calendar;