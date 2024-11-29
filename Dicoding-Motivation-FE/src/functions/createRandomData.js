import { faker } from "@faker-js/faker";
import moment from "moment";

export const createDataReminderSchedule = ({
  number_of_data,
  number_of_contents,
}) => {
  const data_reminder = [];
  const data_cotents = [];
  const data_frequency = ["daily", "weekly", "once"];

  console.log(number_of_data, number_of_contents);

  for (let j = 0; j < number_of_contents; j++) {
    data_cotents.push({
      id: j + 1,
      title: faker.book.title(),
    });
  }

  for (let i = 0; i < number_of_data; i++) {
    const contents = [];
    const time = {};
    const frequency = data_frequency[faker.number.int(2)];
    const reminder = new Date();

    data_cotents.map((e) => {
      contents.push({ ...e, selected: faker.datatype.boolean(0.6) });
    });

    if (frequency == data_frequency[0]) {
      // randomize hours & minutes
      reminder.setHours(
        reminder.getHours() + faker.number.int({ min: 1, max: 24 })
      );

      time.time = moment(reminder).format("HH:mm");
    } else if (frequency == data_frequency[1]) {
      // randomize hours & minutes
      reminder.setHours(
        reminder.getHours() + faker.number.int({ min: 1, max: 24 })
      );

      time.time = moment(reminder).format("HH:mm");
      time.days = [0, 1, 1, 1, 1, 1, 0];
    } else if (frequency == data_frequency[2]) {
      // randomize hours & minutes
      reminder.setDate(reminder.getDate() + faker.number.int(1, 21));

      time.time = reminder;
    }

    data_reminder.push({
      id: i + 1,
      name: faker.book.title(),
      contents: contents,
      frequency: frequency,
      time: time,
    });
  }

  return data_reminder;
};
