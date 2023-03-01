import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const db = firebase.firestore();

export default function HomeScreen({ props, pets, pet }) {
  // console.log(pets);
  const navigation = useNavigation();
  const goToSearch = () => {
    navigation.navigate("Search");
  };
  const goToUserProfile = () => {
    navigation.navigate("UserProfile");
  };

  const goToMapPage = () => {
    navigation.navigate("MapPage", {
      pets: pets,
      pet: pet,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="envelope-o" size={35} color="#900" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToSearch()}
        >
          <Icon name="search" size={35} color="#900" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToUserProfile()}
        >
          <Icon name="user-circle-o" size={35} color="#900" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToMapPage()}
        >
          <Icon name="map-marker" size={35} color="#900" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexend: 0,
    backgroundColor: "#5cc8d7",
  },
  footer: {
    backgroundColor: "yellow",
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 50,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
