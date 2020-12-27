import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    activeDate: moment().subtract(1, 'month').valueOf(),
  },
  reducers: {
    nextMonth: state => {
      state.activeDate = moment(state.activeDate).add(1, 'month').valueOf()
    },
    previousMonth: state => {
      state.activeDate = moment(state.activeDate).subtract(1, 'month').valueOf()
    },
  },
});

export const { nextMonth, previousMonth } = calendarSlice.actions;

export const selectActiveDate = (state) => moment(state.calendar.activeDate);

export default calendarSlice.reducer;
