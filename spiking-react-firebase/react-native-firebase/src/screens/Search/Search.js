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
  TextInput
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
import SelectDropdown from 'react-native-select-dropdown'

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

  return (
    <View >
        <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
             style={{padding: 10}}
      />
     <Footer />
     <SelectDropdown
	data={countries}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
    </View>
  );
}
