import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [
        {
            id: 0,
            title: 'Family Brunch',
            start: '2023-12-01T10:30:00',
            end: '2023-12-01T12:00:00',
            allDay: false
        },
        {
            id: 1,
            title: 'Doctor Appointment',
            start: '2023-12-03',
            allDay: true
        },
        {
            id: 2,
            title: 'School Play',
            start: '2023-12-05T18:00:00',
            end: '2023-12-05T20:00:00',
            allDay: false
        },
        {
            id: 3,
            title: 'Grocery Shopping',
            start: '2023-12-07T09:00:00',
            end: '2023-12-07T10:00:00',
            allDay: false
        },
        {
            id: 4,
            title: 'Weekend Getaway',
            start: '2023-12-10',
            end: '2023-12-12',
            allDay: true
        }
    ],
    nextId: 5,
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: (state, action) => {
            console.log(JSON.parse(JSON.stringify(state.events)));
            const newId = state.nextId++;

            const newEvent = {
                ...action.payload,
                id: newId,
            };
            state.events.push(newEvent);
            console.log(JSON.parse(JSON.stringify(state.events)));
        },
        updateEvent: (state, action) => {
            const { id, title, start, end, allDay } = action.payload;

            // Find the existing event in the events array
            const existingEvent = state.events.find((e) => e.id === id);

            // If the event exists, update its properties
            if (existingEvent) {
                existingEvent.title = title;
                existingEvent.start = start;
                existingEvent.end = end;
                existingEvent.allDay = allDay;
            }
            // console.log(JSON.parse(JSON.stringify(state.events)))
            // console.log(action.payload)
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload.id);
        },
    }
})

export const selectEvents = (state) => state.calendar.events;
export const calendarReducer = calendarSlice.reducer;
export const { addEvent, removeEvent, updateEvent } = calendarSlice.actions;