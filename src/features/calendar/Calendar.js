import React from "react";
import { Button, Text, View } from "react-native";
import { connect, useSelector } from "react-redux";

import { nextMonth, previousMonth, selectActiveDate } from "./calendarSlice";
import { addDays, subDays } from "../../utils/date";
import { capitalize } from "../../utils/string";

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
    let firstDayIndex = firstDay.weekday();
    firstDayIndex = firstDayIndex === 6 ? -1 : firstDayIndex;

    const matrix = [];
    const matrixInitialDate = subDays(firstDay, firstDayIndex);

    let currentDateIndex = 0;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        const currentDate = addDays(matrixInitialDate.clone(), currentDateIndex);
        const key = currentDate.format("DD-MM-YYYY");

        matrix[row][col] = <Day key={key} date={currentDate} />;
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
    const title = capitalize(activeDate.format("MMMM yyyy"));

    return (
      <View style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Button title="<" onPress={() => props.previousMonth()} />
        <Text
          style={{
            padding: 16,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}>
          {title}
        </Text>
        <Button title=">" onPress={() => props.nextMonth()} />
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
