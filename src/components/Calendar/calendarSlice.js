import { createSlice, configureStore } from '@reduxjs/toolkit'
import { addMonths } from 'date-fns'

const calendarSlice = createSlice({
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

const store = configureStore({
  reducer: calendarSlice.reducer
})

export const selectActiveDate = (state) => state.calendar.activeDate
