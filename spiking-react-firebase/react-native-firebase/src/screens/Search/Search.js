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
  TextInput,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
import SelectDropdown from "react-native-select-dropdown";
import { getStorage } from "firebase/storage";

export default function Search({ props }) {
  const [pets, setPets] = useState([]);
  const db = firebase.firestore();

 

  const handlePetTypeSelection = async (petType) => {
    const storage = getStorage();
    const queryPets = await db
      .collection("lost_pets")
      .where("pet_type", "==", petType)
      .get();
    const newPets = [];
    const newURL = []; //
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };

      newPets.push(pet);
    });
    setPets(newPets);
  };

  const petTypes = ["Cat", "Dog", "Rabbit", "Bird", "other"];

 

  return (
      <ScrollView>
    <View>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={{ padding: 10 }}
        />
        <SelectDropdown
          data={petTypes}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            handlePetTypeSelection(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
        {pets.map((pet) => {
          return (
            <>
              <Text key={pet.id}>{pet.your_name}</Text>
              <Image
                source={{
                  uri: pet.picture,
                }}
                style={{ width: 200, height: 200 }}
              />
            </>
          );
        })}
        <Footer />
    </View>
      </ScrollView>
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
