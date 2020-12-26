import React, { useState } from "react";
import { addDays, format, startOfWeek } from "date-fns";
import { default as ptBrLocale } from "date-fns/locale/pt-BR";
import { Text } from "react-native";

const Weekday = (props) => {
  const name = format(addDays(startOfWeek(new Date()), props.dayIndex), "iiii", { locale: ptBrLocale });
  const shortName = name[0].toUpperCase();

  const [state] = useState({
    name,
    shortName
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
