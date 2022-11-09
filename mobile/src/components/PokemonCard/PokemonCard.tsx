import React from "react";
import {
  View,
  Text,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
} from "react-native";

interface Props {
  name: string;
  pokedexNumber: string;
  image: string;
  color: string;
  margin?: boolean;
}

export default function PokemonCard({
  name,
  pokedexNumber,
  image,
  color,
  margin = false,
}: Props) {
  return (
    <TouchableOpacity
      style={$button(margin)}
      activeOpacity={0.9}
      onPress={() => {}}
    >
      <View style={$card}>
        <View style={$pokedexNumberContainer}>
          <Text style={$pokemonNumber(color)}>{pokedexNumber}</Text>
        </View>
        <Image
          style={$pokemonImage}
          source={{
            uri: image,
          }}
        />
        <View style={$pokemonNameContainer(color)}>
          <Text style={$pokemonName}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const $button = (margin: boolean): ViewStyle => ({
  flex: 1,
  margin: margin ? 6 : 0,

  backgroundColor: "white",

  // Android
  elevation: 4,

  // iOS
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  borderRadius: 12,
});

const $card: ViewStyle = {
  width: "100%",
  alignItems: "center",
  flexGrow: 1,
  flexShrink: 1,
  flexWrap: "wrap",
};

const $pokedexNumberContainer: ViewStyle = {
  alignItems: "flex-end",
  width: "100%",
  paddingHorizontal: 10,
  paddingVertical: 8,
};

const $pokemonNumber = (color: string): TextStyle => ({
  fontWeight: "bold",
  fontSize: 14,
  lineHeight: 16,
  color: color,
});

const $pokemonImage: ImageStyle = {
  height: 80,
  width: 80,
};

const $pokemonNameContainer = (color: string): ViewStyle => ({
  backgroundColor: color,
  width: "100%",
  alignItems: "center",
  padding: 10,
  borderBottomRightRadius: 10,
  borderBottomLeftRadius: 10,
});

const $pokemonName: TextStyle = {
  fontSize: 16,
  lineHeight: 24,
  fontWeight: "bold",
  color: "white",
};
