import React from "react";
import moment from "moment";
import { Text } from "react-native";
import { connect, useSelector } from "react-redux";
import { selectActiveDate } from "./calendarSlice";
import { isSameDay, isSameMonth } from "../../utils/date";

const Day = (props) => {
  /**
   * @var {Moment} calendarActiveDate
   */
  const calendarActiveDate = useSelector(selectActiveDate);

  const getStyles = () => {
    const now = moment();
    const isCurrentMonthDate = isSameMonth(calendarActiveDate, props.date);

    const color = isCurrentMonthDate ? "rgba(33, 33, 33, 1)" : "rgba(33, 33, 33, 0.5)";
    const isToday = isSameDay(props.date, now);

    const todayStyle = {
      color: isToday ? "cornflowerblue" : color,
      fontWeight: isToday ? "bold" : undefined,
    };

    const styles = {
      flex: 1,
      backgroundColor: "white",
      textAlign: "center",
      paddingVertical: 12,
    };

    return {
      ...styles,
      ...todayStyle,
    };
  };

  return (
    <Text
      style={getStyles()}>
      {props.date.format('DD')}
    </Text>
  );
};

export default connect()(Day);
