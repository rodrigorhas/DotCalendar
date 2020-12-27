import React, { useState } from "react";
import { Text } from "react-native";
import moment from "moment";

const Weekday = (props) => {
  const name = moment.weekdaysShort()[props.dayIndex];
  const shortName = name[0].toUpperCase();

  const [state] = useState({
    name,
    shortName,
  });

  return (
    <Text
      style={{
        flex: 1,
        textAlign: "center",
        backgroundColor: "#FFF",
        color: "#000",
        paddingVertical: 24,
      }}
    >
      {state.shortName}
    </Text>
  );
};

export default Weekday;
