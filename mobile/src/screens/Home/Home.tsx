import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Header from "../../components/Header/Header";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const listRef = useRef<any>();

  const fetchData = async () => {
    if (loading) return;

    let res: any = await fetch(
      `http://localhost:3000/pokemon?offset=${offset}`
    );

    res = await res.json();
    setData([...data, ...res["results"]]);
    setOffset(res["nextOffset"]);
    setLoading(false);
    // // console.log(res);

    // axios
    //   .get(`http://localhost:3000/pokemon?offset=${offset}`)a
    //   .then((res) => {
    //     setData([...data, ...res.data.results]);
    //     setOffset(res.data.nextOffset);
    //   })
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const renderFooter = () => {
    if (loading) return null;
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  };

  if (!loading) {
    return (
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => <PokemonCard {...item} margin />}
          keyExtractor={({ pokedexNumber }) => pokedexNumber}
          ListHeaderComponent={() => <Header />}
          onEndReached={fetchData}
          onEndReachedThreshold={3}
          numColumns={3}
          ListFooterComponent={renderFooter}
          ref={listRef}
          scrollsToTop={true}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "red",
            position: "absolute",
            bottom: 10,
            right: 10,
            padding: 5,
            borderRadius: 100,
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
          }}
          onPress={() => {
            listRef?.current.scrollToOffset({ offset: 0, animated: true });
          }}
        >
          <Feather name="arrow-up" size={36} color="white" />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={$loadingContainer}>
        <Text style={$loading}>...Carregando</Text>
      </View>
    );
  }
}

const $loadingContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
};

const $loading: TextStyle = {
  fontSize: 32,
  lineHeight: 44,
  fontWeight: "bold",
};
