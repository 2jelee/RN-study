import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// 상동 (es6)
const { width: SCREEN_WIDTH } = Dimensions.get("window"); // object 안에 있는 width를 가져오고 그 이름을 이것으로 바꾼다는 것
const API_KEY = "b848d62fdf1255e039f0169e5d42c269";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    // console.log(permission);
    if (!granted) {
      setOk(false);
    }
    // const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    // console.log(location);
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    // console.log(location);
    setCity(location[0].city);
    // console.log(city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`
    );
    const json = await response.json();
    console.log(json);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        contentContainer={styles.weather}
        horizontal
        pagingEnabled
        // indicatorStyle="black"
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
  },
  city: {
    // flex: 1,
    flex: 1.2,
    fontSize: 100,
    // backgroundColor: "blue",
    justifyContent: "center", // 글자가 중앙에 위치하도록 1
    alignItems: "center", // 글자가 중앙에 위치하도록 2
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {
    // flex: 2,
    // fontSize: 200,
    // flex: 3,
  },
  day: {
    // flex: 1,
    // backgroundColor: "teal",
    // justifyContent: "center",
    // width: 250,
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
