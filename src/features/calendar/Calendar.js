import React from "react";
import { View } from "react-native";
import { connect, useSelector } from "react-redux";

import { nextMonth, previousMonth, selectActiveDate } from "./calendarSlice";
import { addDays, subDays } from "../../utils/date";

import Day from "./Day";
import Weekday from "./Weekday";

const mapDispatchToProps = { nextMonth, previousMonth };

const Calendar = (props) => {
  /**
   * @var {Moment} activeDate
   */
  const activeDate = useSelector(selectActiveDate);

  const generateMatrix = () => {
    const firstDay = activeDate.clone().startOf("month");
    const firstDayIndex = firstDay.weekday();

    const matrix = [];
    const matrixInitialDate = firstDayIndex > 0 && firstDayIndex < 6 ? subDays(firstDay, firstDayIndex) : firstDay;

    let currentDateIndex = 0
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        const currentDate = addDays(matrixInitialDate.clone().utc(), currentDateIndex);
        const key = currentDate.format("DD-MM-YYYY");

        const tempHasEvents = ((col * row) + 2) % 4; // random

        matrix[row][col] = <Day key={key} date={currentDate} hasEvents={tempHasEvents}/>;
        currentDateIndex++;
      }
    }

    return matrix;
  };

  const createCalendarRows = () => {
    return generateMatrix().map((week, weekIndex) => {
      return (
        <View
          key={weekIndex}
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}>
          {week}
        </View>
      );
    });
  };

  const createWeekdaysHeader = () => {
    const weekdays = Array(7).fill(0)
      .map((_, index) => (
        <Weekday key={index} dayIndex={index} />
      ));

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}>
        {weekdays}
      </View>
    );
  };

  const createCalendarMainHeader = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}>

        {/*<Button title="<" onPress={() => props.previousMonth()} />*/}
        {/*<Button title=">" onPress={() => props.nextMonth()} />*/}
      </View>
    );
  };

  return (
    <View>
      {createCalendarMainHeader()}
      {createWeekdaysHeader()}
      {createCalendarRows()}
    </View>
  );
};

export default connect(null, mapDispatchToProps)(Calendar);
