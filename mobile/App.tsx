import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Routes from "./src/routes/Routes";
import Home from "./src/screens/Home/Home";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor="red" />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
