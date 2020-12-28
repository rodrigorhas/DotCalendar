import React from "react";
import moment from "moment";

import { connect, useSelector } from "react-redux";
import { SafeAreaView, ScrollView, View } from "react-native";
import { IconButton } from "react-native-paper";

import { nextMonth, previousMonth, selectActiveDate, today } from "../features/calendar/calendarSlice";
import { Calendar } from "../features/calendar";

import { styles } from "../styles";
import { isSameYear } from "../utils/date";
import { capitalize } from "../utils/string";

const CalendarHeaderRight = (props) => (
  <View style={{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  }}>
    <IconButton icon="chevron-left" onPress={() => props.previousMonth()} />
    <IconButton icon="calendar" onPress={() => props.today()} />
    <IconButton icon="chevron-right" onPress={() => props.nextMonth()} />
  </View>
);

const CalendarScreen = (props) => {

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <CalendarHeaderRight {...props} />,
    });
  }, [props.navigation]);

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Calendar />
      </ScrollView>
    </SafeAreaView>
  );
};

CalendarScreen.navigationOptions = () => {
  const activeDate = useSelector(selectActiveDate);
  const titleFormat = isSameYear(moment(), activeDate) ? "MMMM" : "MMM [de] yyyy";
  const title = capitalize(activeDate.format(titleFormat));

  return { title };
};

const mapDispatchToProps = {
  previousMonth, nextMonth, today,
};

export default connect(null, mapDispatchToProps)(CalendarScreen);
