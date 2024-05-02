import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the calendar, including a list of sample events and a counter for new event IDs
const initialState = {
    events: [
        {
            id: 0,
            title: 'Family Brunch',
            start: '2024-05-01T10:30:00',
            end: '2024-05-01T12:00:00',
            allDay: false
        },
        {
            id: 1,
            title: 'Doctor Appointment',
            start: '2024-05-03',
            allDay: true
        },
        {
            id: 2,
            title: 'School Play',
            start: '2024-05-05T18:00:00',
            end: '2024-05-05T20:00:00',
            allDay: false
        },
        {
            id: 3,
            title: 'Grocery Shopping',
            start: '2024-05-07T09:00:00',
            end: '2024-05-07T10:00:00',
            allDay: false
        },
        {
            id: 4,
            title: 'Weekend Getaway',
            start: '2024-05-10',
            end: '2024-05-12',
            allDay: true
        }
    ],
    nextId: 5, // Counter to assign unique IDs to new events
};

// Create a slice for calendar functionalities including adding, updating, and deleting events
const calendarSlice = createSlice({
    name: 'calendar', // Name of the slice used in action types
    initialState,     // The initial state of the calendar
    reducers: {
        // Reducer to add a new event. Payload should include title, start, end, and allDay status
        addEvent: (state, action) => {
            const newId = state.nextId++; // Increment nextId to ensure each event has a unique ID

            const newEvent = {
                ...action.payload, // Spread payload to get title, start, end, and allDay
                id: newId,         // Assign the new unique ID to the event
            };
            state.events.push(newEvent); // Add the new event to the events array
        },
        // Reducer to update an existing event. Payload must include id, title, start, end, and allDay
        updateEvent: (state, action) => {
            const { id, title, start, end, allDay } = action.payload;
            const existingEvent = state.events.find((e) => e.id === id); // Find the event by ID

            if (existingEvent) {
                existingEvent.title = title;  // Update the title
                existingEvent.start = start;  // Update the start time
                existingEvent.end = end;      // Update the end time
                existingEvent.allDay = allDay; // Update allDay status
            }
        },
        // Reducer to delete an event by ID
        deleteEvent: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload.id); // Remove event by ID
        },
    }
})

// Selector to access events from the state
export const selectEvents = (state) => state.calendar.events;
// Export the calendar reducer to be included in the store
export const calendarReducer = calendarSlice.reducer;
// Export action creators for use within components
export const { addEvent, deleteEvent, updateEvent } = calendarSlice.actions;
