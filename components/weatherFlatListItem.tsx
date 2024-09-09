import { View, Text, StyleSheet } from "react-native";

import { ForecastDay } from "../src/store/services/weather";

const getDayOfWeek = (dateString: string): string => {
  const daysOfWeek = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П’ятниця",
    "Субота",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};

interface WeatherFlatListItemProps {
  item: ForecastDay;
}

const WeatherFlatListItem: React.FC<WeatherFlatListItemProps> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{getDayOfWeek(item.date)}</Text>
      <Text>Температура: {item.day.avgtemp_c}</Text>
      <Text>{item.day.condition.text}</Text>
      <Text>Максимальна температура: {item.day.maxtemp_f}</Text>
    </View>
  );
};

export default WeatherFlatListItem;

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 15,
  },
});
