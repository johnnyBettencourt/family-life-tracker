import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { useSelector } from 'react-redux';
import { selectEvents } from './calendarSlice';
import './calendar.css';

export default function Calendar() {
    // Fetch events from Redux store
    const events = useSelector(selectEvents);

    return (
        <div className="flex m-4">
            <div className='w-3/4 h-3/4 m-1'>
                <div className='p-4 bg-white rounded-lg shadow'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        events={events} // Pass the events to FullCalendar
                    />
                </div>
            </div>
            <div className='w-1/4 h-full m-1'>
                <div className='p-4 bg-white rounded-lg shadow'>
                    <FullCalendar
                        plugins={[listPlugin]}
                        initialView='listWeek'
                        events={events} // Pass the events to FullCalendar
                    />
                </div>
            </div>
        </div>
    );
}
