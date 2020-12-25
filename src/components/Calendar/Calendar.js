import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { addDays, addMonths, format, startOfMonth } from "date-fns";

import { Day, Weekday } from "./Day";

// import { Button } from "@material-ui/core";

export class Calendar extends Component {

  monthMap = new Map();

  weekdays = [];

  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  state = {
    activeDate: new Date(),
  };

  constructor() {
    super();

    this.weekdays = Array(7).fill(0).map((_, i) => new Weekday(i));
  }

  generateMatrix() {
    const firstDay = startOfMonth(this.state.activeDate);
    const monthMapKey = format(firstDay, 'dd-MM-yyyy')

    if (this.monthMap.has(monthMapKey)) {
      console.log('cached')
      return this.monthMap.get(monthMapKey)
    }

    const matrix = [];
    const matrixInitialDate = addDays(firstDay, -firstDay.getDay());

    let counter = 0;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        const iterationDate = addDays(matrixInitialDate, counter);
        const key = format(iterationDate, 'dd-MM-yyyy');
        matrix[row][col] = <Day key={key} date={iterationDate} />;
        counter++;
      }
    }

    this.monthMap.set(monthMapKey, matrix)

    return matrix;
  }

  createCalendarRows() {
    return this.generateMatrix().map((week, weekIndex) => {
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
  }

  createWeekdaysHeader() {
    const weekdays = this.weekdays.map((weekday, index) => {
      return (
        <Text
          key={`${weekday.name}-${index}`}
          style={{
            flex: 1,
            textAlign: "center",
            backgroundColor: "#FFF",
            color: "#000",
            paddingVertical: 24,
          }}
        >
          {weekday.shortName}
        </Text>
      );
    });

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}>
        {weekdays}
      </View>
    );
  }

  createCalendarMainHeader() {
    const title = format(this.state.activeDate, 'MMMM yyyy')

    return (
      <Text
        style={{
          padding: 16,
          fontWeight: "bold",
          fontSize: 18,
          textAlign: "center",
        }}>
        {title}
      </Text>
    );
  }

  changeMonth(dir) {
    this.setState(() => {
      this.state.activeDate = addMonths(this.state.activeDate, dir);
      return this.state;
    });
  }

  render() {
    const header = this.createCalendarMainHeader();
    const weekdays = this.createWeekdaysHeader();
    const rows = this.createCalendarRows();

    return (
      <>
        {header}
        {weekdays}
        {rows}
        <Button title="Previous" onPress={() => this.changeMonth(-1)} />
        <Button title="Next" onPress={() => this.changeMonth(+1)} />
      </>
    );
  }
}
