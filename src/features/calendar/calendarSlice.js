import moment from "moment";
import { createSlice } from "@reduxjs/toolkit";
import { addMonths, subMonths } from "../../utils/date";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    activeDate: moment().valueOf(),
  },
  reducers: {
    nextMonth: state => {
      state.activeDate = addMonths(moment(state.activeDate), 1).valueOf();
    },
    previousMonth: state => {
      state.activeDate = subMonths(moment(state.activeDate), 1).valueOf();
    },
  },
});

export const { nextMonth, previousMonth } = calendarSlice.actions;

export const selectActiveDate = (state) => moment(state.calendar.activeDate);

export default calendarSlice.reducer;
