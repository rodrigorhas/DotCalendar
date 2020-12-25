import React, { Component } from "react";
import { addDays, format, isSameMonth, startOfWeek, isSameDay } from "date-fns";
import { default as ptBrLocale } from "date-fns/locale/pt-BR";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { selectActiveDate } from "./calendarSlice";

export class Weekday {
  name = "";
  shortName = "";

  constructor(weekdayIndex) {
    const now = new Date();
    const dayName = format(addDays(startOfWeek(now), weekdayIndex), "iiii", { locale: ptBrLocale });
    this.name = dayName;
    this.shortName = dayName[0].toUpperCase();
  }
}

export class Day extends Component {
  state = { name: 1 };

  getStyles() {
    const calendarActiveDate = useSelector(selectActiveDate)
    console.log(calendarActiveDate)
    const now = new Date();
    const isCurrentMonthDate = isSameMonth(now, this.props.date);

    const color = isCurrentMonthDate ? "rgba(33, 33, 33, 1)" : "rgba(33, 33, 33, 0.5)";
    const isToday = isSameDay(this.props.date, now) ? "bold" : undefined

    return {
      color,
      backgroundColor: "white",
      fontWeight: isToday,
      flex: 1,
      textAlign: "center",
      paddingVertical: 12,
    };
  }

  render() {
    this.state.name = this.props.date.getDate();

    return (
      <Text
        style={this.getStyles()}>
        {this.state.name}
      </Text>
    );
  }
}
