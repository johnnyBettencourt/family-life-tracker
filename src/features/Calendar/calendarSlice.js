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
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: (state, action) => {
            state.events.push(action.payload);
        },
        editEvent: (state, action) => {
            const id = Number(action.payload.id);
            const index = state.events.findIndex(event => event.id === id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
        },
        removeEvent: (state, action) => {
            const id = Number(action.payload.id);
            state.events = state.events.filter(event => event.id !== id);
        },
    },
})

export const selectEvents = (state) => state.calendar.events;
export const calendarReducer = calendarSlice.reducer;
export const { addEvent, removeEvent, editEvent } = calendarSlice.actions;