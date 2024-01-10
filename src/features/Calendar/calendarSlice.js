import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    events: [
        {
            id: 1,
            title: 'Family Brunch',
            start: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-01T10:30:00',
            end: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-01T12:00:00',
            allDay: false
        },
        {
            id: 2,
            title: 'Doctor Appointment',
            start: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-03',
            allDay: true
        },
        {
            id: 3,
            title: 'School Play',
            start: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-05T18:00:00',
            end: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-05T20:00:00',
            allDay: false
        },
        {
            id: 4,
            title: 'Grocery Shopping',
            start: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-07T09:00:00',
            end: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-07T10:00:00',
            allDay: false
        },
        {
            id: 5,
            title: 'Weekend Getaway',
            start: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-10',
            end: new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-12',
            allDay: true
        }
    ],
    // nextId: 6,
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: (state, action) => {
            const newId = state.nextId++;

            // Create a new task object based on the action payload
            const newEvent = {
                ...action.payload,
                id: newId,
            };
            state.events.push(newEvent);
        },
        removeEvent: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload.id);
        }
    }
})

export const selectEvents = (state) => state.calendar.events;
export const calendarReducer = calendarSlice.reducer;
export const { addEvent, removeEvent } = calendarSlice.actions;