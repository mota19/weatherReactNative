import { useGetWeatherQuery } from "../src/store/services/weather"; // Або шлях до твого weatherApi

import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { useForm, Controller } from "react-hook-form";

import WeatherFlatListItem from "./weatherFlatListItem";

interface FormData {
  days: string;
}

const Weather: React.FC = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  const [days, setDays] = useState<number>(10);

  const { control, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  const onSubmit = (data: FormData) => {
    const numDays = parseInt(data.days, 10);
    if (!isNaN(numDays)) {
      setDays(numDays);
    }
  };

  const lat = location?.coords.latitude ?? 0;
  const lon = location?.coords.longitude ?? 0;

  const { data, error, isLoading } = useGetWeatherQuery({ lat, lon, days });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>{data?.location.name}</Text>
      </View>
      <FlatList
        data={data?.forecast.forecastday}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <WeatherFlatListItem item={item}></WeatherFlatListItem>
        )}
      />
      <Controller
        control={control}
        name="days"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.formInput}
            value={value}
            onChangeText={onChange}
            placeholder="Enter number of days"
          />
        )}
      />
      <Button title="press" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  itemContainer: {
    marginVertical: 35,
  },
  formInput: {
    width: "50%",
    textAlign: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
  },
});

export default Weather;
