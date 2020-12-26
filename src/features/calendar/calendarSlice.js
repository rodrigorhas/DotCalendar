import { createSlice } from "@reduxjs/toolkit";
import { addMonths } from "date-fns";

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    activeDate: new Date()
  },
  reducers: {
    nextMonth: state => {
      state.activeDate = addMonths(state.activeDate, 1)
    },
    previousMonth: state => {
      state.activeDate = addMonths(state.activeDate, -1)
    }
  }
})

export const { nextMonth, previousMonth } = calendarSlice.actions

export const selectActiveDate = (state) => state.calendar.activeDate

export default calendarSlice.reducer
