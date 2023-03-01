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
  TouchableWithoutFeedback,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const db = firebase.firestore();

export default function HomeScreen({ props, pets, pet }) {
  // console.log(pets);
  const navigation = useNavigation();
  const goToSearch = () => {
    navigation.navigate("Search", {
      pets: pets,
      pet: pet,
    }) ;
  };
  const goToUserProfile = () => {
    navigation.navigate("UserProfile", {
      pets: pets,
      pet: pet,
    });
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

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToSearch()}
        >
          <Icon name="search" size={40} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToUserProfile()}
        >
          <Icon name="user-circle-o" size={40} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToMapPage()}
        >
          <Icon name="map-marker" size={40} color="#000" />
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
     bottom : 25,    
     elevation : 0,
    // backgroundColor : '~ffffff', 
    backgroundColor: "orange",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: "space-evenly",
    // ...styles.shadow,   
  },
  iconContainer: {
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

// const styles1 = StyleSheet.create({
//   shadow: {
//     shadowColor: "black",
//     shadowOffset: {
//       width : 0,
//       height : 10,
//   },
//   shadowOpacity : 0.25,
//   shadowRadius :10,
//   elevation : 5,
//   }
// })