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

const db = firebase.firestore();

export default function HomeScreen({ props }) {
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
      padding: 40,
    },
  });

  const navigation = useNavigation();
  const goToSearch = () => {
    navigation.navigate('Search');
  };
  const goToUserProfile = () => {
    navigation.navigate('UserProfile');
  };

  return (
    <View style={styles.footer}>
      <Button title="Inbox"></Button>
      <Button title="Search" onPress={() => goToSearch()}></Button>
      <Button title="User Profile" onPress={() => goToUserProfile()}></Button>
    </View>
  );
}
