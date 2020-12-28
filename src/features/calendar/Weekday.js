import React, { useState } from "react";
import { Text } from "react-native";
import moment from "moment";
import { colors } from "../../styles/colors";

const styles = {
  weekdayContainer: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "#FFF",
    color: "#000",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.lighter,
  }
}

const Weekday = (props) => {
  const name = moment.weekdaysShort()[props.dayIndex];
  const shortName = name[0].toUpperCase();

  const [state] = useState({
    name,
    shortName,
  });

  return (
    <Text style={styles.weekdayContainer}>
      {state.shortName}
    </Text>
  );
};

export default Weekday;
