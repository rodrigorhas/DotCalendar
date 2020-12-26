import { combineReducers, configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";

export const store = configureStore({
  reducer: combineReducers({
    calendar: calendarReducer
  })
})
