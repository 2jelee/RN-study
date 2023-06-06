import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    // <View style={{ flex: 1 }}> // column이 기본값
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 1, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  );
}
