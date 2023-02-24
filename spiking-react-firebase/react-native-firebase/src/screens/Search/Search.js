import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
ScrollView,
  StyleSheet,
  Button,
  TextInput
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
import SelectDropdown from 'react-native-select-dropdown'
import { getStorage } from "firebase/storage";


export default function Search({ props }) {

  const [pets, setPets] = useState([]);
  const [response, setResponse] = useState(false)

  const db = firebase.firestore();

 
const handlePetTypeSelection = async (petType) => {
    const storage = getStorage();
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    const newURL = []; //
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      if(pet.pet_type === petType){
        newPets.push(pet);
      }
    });
    setPets(newPets);
    console.log(newPets)
}


const petTypes = ['Cat', 'Dog', 'Rabbit', 'Bird', 'other']
 
useEffect(()=> {

}, [])

  return (
      <View >
          <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
               style={{padding: 10}}
        />
       <SelectDropdown
    data={petTypes}
    onSelect={(selectedItem, index) => {
      
      console.log(selectedItem, index)
      handlePetTypeSelection(selectedItem)

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
   {pets.map((pet) => {
          return (
            <ScrollView key={pet.id}>
              <Text>{pet.your_name}</Text>
              <Image
                source={{
                  uri: pet.picture,
                }}
                style={{ width: 200, height: 200 }}
              />
            </ScrollView>
            )})}
  <Footer />
      </View>
    );
  }



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