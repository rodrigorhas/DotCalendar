import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
import { addMonths, isSameDay, subMonths } from "../../utils/date";
import { appointments, reminders } from "./mock";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    activeDate: moment().valueOf(),
    reminders,
    appointments
  },
  reducers: {
    nextMonth: state => {
      state.activeDate = addMonths(moment(state.activeDate), 1).valueOf();
    },
    previousMonth: state => {
      state.activeDate = subMonths(moment(state.activeDate), 1).valueOf();
    },
    today: state => {
      state.activeDate = moment().valueOf()
    },
  },
});

export const { nextMonth, previousMonth, today } = calendarSlice.actions;

export const selectActiveDate = (state) => moment(state.calendar.activeDate);
export const selectAppointmentsByDate = (date) => (state) => state.calendar.appointments
  .filter((appointment) => isSameDay(date, appointment.date))

export const selectRemindersByDate = (date) => (state) => state.calendar.reminders
  .filter((appointment) => isSameDay(date, appointment.date))

export const selectHasEventsForDate = (date) => (state) => {
  const {reminders, appointments} = state.calendar

  return [...appointments, ...reminders].filter(event => isSameDay(date, event.date))
}

export default calendarSlice.reducer;
