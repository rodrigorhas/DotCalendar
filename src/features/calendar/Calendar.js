import React from "react";
import { Button, Text, View } from "react-native";
import { connect, useSelector } from "react-redux";
import { addDays, format, startOfMonth } from "date-fns";

import { nextMonth, previousMonth, selectActiveDate } from "./calendarSlice";
import Day from "./Day";
import Weekday from "./Weekday";

const mapDispatchToProps = { nextMonth, previousMonth };

const Calendar = (props) => {

  const activeDate = useSelector(selectActiveDate)

  const generateMatrix = () => {
    const firstDay = startOfMonth(activeDate);

    const matrix = [];
    const matrixInitialDate = addDays(firstDay, -firstDay.getDay());

    let counter = 0;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        const iterationDate = addDays(matrixInitialDate, counter);
        const key = format(iterationDate, "dd-MM-yyyy");
        matrix[row][col] = <Day key={key} date={iterationDate} />;
        counter++;
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

  const changeMonth = (dir) => {
    console.log(dir)
    if (dir) {
      props.nextMonth(dir)
    } else {
      props.previousMonth(dir)
    }
  }

  const createCalendarMainHeader = () => {
    const title = format(activeDate, "MMMM yyyy");

    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <Button title="<" onPress={() => changeMonth(-1)} />
        <Text
          style={{
            padding: 16,
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
          }}>
          {title}
        </Text>
        <Button title=">" onPress={() => changeMonth(+1)} />
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
