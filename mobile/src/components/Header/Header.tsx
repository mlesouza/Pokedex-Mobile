import React from "react";
import { View, Image, ImageStyle, ViewStyle, StyleSheet } from "react-native";
import logo from "../../assets/pokemon-logo.png";

export default function Header() {
  return (
    <View style={$header}>
      <Image style={$logo} source={logo} />
    </View>
  );
}

const $header: ViewStyle = {
  backgroundColor: "red",
  width: "100%",
  height: 90,
  alignItems: "center",
  justifyContent: "center",
};

const $logo: ImageStyle = {
  height: 50,
  width: 140,
};
