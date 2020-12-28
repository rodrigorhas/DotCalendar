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
    flexDirection: 'column',
  },
  dayText: {
    flex: 1,
    backgroundColor: "white",
    textAlign: "center",
    paddingVertical: 12,
  }
}

const BottomDot = (props) => {
  return (
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    }}>
      <View style={{
        width: '100%',
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: props.active ? colors.primary : colors.lighter,
      }}/>
    </View>
  )
}

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

    return {
      ...styles.dayText,
      ...todayStyle,
    };
  };

  return (
    <View style={styles.dayContainer}>
      <Text
        style={getStyles()}>
        {props.date.format('DD')}
      </Text>
      <BottomDot active={props.hasEvents}/>
    </View>
  );
};

export default connect()(Day);
