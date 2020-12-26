import React from "react";
import { Text } from "react-native";
import { isSameDay, isSameMonth } from "date-fns";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({activeDate: state.calendar.activeDate})

const Day = (props) => {
  const calendarActiveDate = props.activeDate

  const getStyles = () => {
    const now = new Date();
    const isCurrentMonthDate = isSameMonth(calendarActiveDate, props.date);

    const color = isCurrentMonthDate ? "rgba(33, 33, 33, 1)" : "rgba(33, 33, 33, 0.5)";
    const isToday = isSameDay(props.date, now)

    const todayStyle = {
      color: isToday ? 'cornflowerblue' : color,
      fontWeight: isToday ? "bold" : undefined
    }

    const styles = {
      flex: 1,
      backgroundColor: "white",
      textAlign: "center",
      paddingVertical: 12,
    }

    return {
      ...styles,
      ...todayStyle
    };
  }

  return (
    <Text
      style={getStyles()}>
      {props.date.getDate()}
    </Text>
  );
}

export default connect(mapStateToProps)(Day)
