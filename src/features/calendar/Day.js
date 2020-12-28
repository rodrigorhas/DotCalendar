import React from "react";
import moment from "moment";
import { Text, View } from "react-native";
import { connect, useSelector } from "react-redux";
import { selectActiveDate } from "./calendarSlice";
import { isSameDay, isSameMonth } from "../../utils/date";
import { colors } from "../../styles/colors";

const styles = {
  dayContainer: {
    flex: 1,
    flexDirection: "column",
  },
  dayTextBase: {
    flex: 1,
    backgroundColor: colors.white,
    textAlign: "center",
  },
};

const DayContent = (props) => {
  /**
   * @var {Moment} calendarActiveDate
   */
  const calendarActiveDate = useSelector(selectActiveDate);

  const now = moment();
  const isToday = isSameDay(props.date, now);

  const isCurrentMonthDate = isSameMonth(calendarActiveDate, props.date);

  const todayContainerStyle = {
    ...styles.dayTextBase,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  };

  const todayTextStyle = {
    backgroundColor: colors.primary,
    color: "white",
    fontWeight: "400",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 100,
    fontSize: 12,
  }

  const today = (
    <View style={todayContainerStyle}>
      <Text style={todayTextStyle}>
        {props.date.format("DD")}
      </Text>
    </View>
  );

  const common = (
    <Text
      style={{
        ...styles.dayTextBase,
        paddingVertical: 12,
        color: isCurrentMonthDate ? "rgba(33, 33, 33, 1)" : "rgba(33, 33, 33, 0.5)",
      }}>
      {props.date.format("D")}
    </Text>
  );

  return isToday ? today : common;
};

const BottomDot = (props) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    }}>
      <View style={{
        width: "100%",
        borderBottomWidth: 2,
        borderBottomStyle: "solid",
        borderBottomColor: props.active ? colors.primary : colors.lighter,
      }} />
    </View>
  );
};

const Day = (props) => {
  return (
    <View style={styles.dayContainer}>
      <DayContent date={props.date} />
      <BottomDot active={props.hasEvents} />
    </View>
  );
};

export default connect()(Day);
