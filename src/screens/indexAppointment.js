import React from "react";
import moment from "moment";

import { connect, useSelector } from "react-redux";
import { View } from "react-native";
import { List, Text } from "react-native-paper";

import { styles } from "../styles";
import { selectAppointmentsByDate, selectRemindersByDate } from "../features/calendar/calendarSlice";

const EmptyText = (props) => <Text style={{paddingVertical: 12, paddingHorizontal: 16}}>{props.content}</Text>

const Event = (props) => {
  const description = `Em ${props.city} ás ${props.date.format("HH:mm")}`;
  const LeftContent = () => <List.Icon icon="calendar" color={props.color} />;

  return (
    <List.Item
      title={props.description}
      description={description}
      left={LeftContent}
    />
  );
};

const IndexAppointmentScreen = (props) => {
  const date = moment(props.route.params.date);
  const appointments = useSelector(selectAppointmentsByDate(date));
  const reminders = useSelector(selectRemindersByDate(date));

  const renderAppointments = () => {
    if (!appointments.length) {
      return <EmptyText content="Nenhum evento encontrado" />
    }

    return appointments
      .map((appointment) => <Event {...appointment} />);
  };

  const renderReminders = () => {
    if (!reminders.length) {
      return <EmptyText content="Nenhum lembrete encontrado" />
    }

    return reminders
      .map((reminder) => <Event {...reminder} />);
  };

  return (
    <View style={styles.scrollView}>
      <List.Section>
        <List.Subheader>Eventos</List.Subheader>
        {renderAppointments()}
      </List.Section>
      <List.Section>
        <List.Subheader>Lembretes</List.Subheader>
        {renderReminders()}
      </List.Section>
    </View>
  );
};

IndexAppointmentScreen.navigationOptions = (props) => {
  const date = moment(props.route.params.date);

  return {
    title: date.format("DD/MM/YYYY"),
  };
};

export default connect()(IndexAppointmentScreen);
