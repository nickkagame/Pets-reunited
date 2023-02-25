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

export default function HomeScreen({ props }) {
  const navigation = useNavigation();
  const goToSearch = () => {
    navigation.navigate("Search");
  };
  const goToUserProfile = () => {
    navigation.navigate("UserProfile");
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footer}>
        {/* <Text>Inbox</Text> */}
        <Icon name="envelope-o" size={35} color="#900" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footer} onPress={() => goToSearch()}>
        {/* <Text>Search</Text> */}
        <Icon name="search" size={35} color="#900" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.footer} onPress={() => goToUserProfile()}>
        {/* <Text>User Profile</Text> */}
        <Icon
          style={styles.iconFooter}
          name="user-circle-o"
          size={35}
          color="#900"
        />
      </TouchableOpacity>
    </View>
  );
}
// Can style the images!
//They are clickable

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: "yellow",
    padding: 30,
    flexDirection: "row",
  },
  iconFooter: {
    justifyContent: "center",
    verticalAlign: "center",
    marginRight: 50,
  },
});
