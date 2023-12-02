import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import './calendar.css';

export default function Calendar() {
    return (
        <div className="flex m-4 font-sans">
            <div className='w-3/4 h-3/4 m-1'>
                <div className='p-4 bg-white rounded-lg shadow'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                    />
                </div>
            </div>
            <div className='w-1/4 h-full m-1'>
                <div className='p-4 bg-white rounded-lg shadow'>
                <FullCalendar
                        plugins={[listPlugin]}
                        initialView='listWeek'
                    />
                </div>
            </div>
        </div>
    )
}
