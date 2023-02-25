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
    <>
      <ScrollView style={styles.container}>
        <View style={styles.dropDown}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            style={{ padding: 10 }}
          />
          <SelectDropdown
            style={styles.dropDown}
            data={petTypes}
            onSelect={(selectedItem, index) => {
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
                <Text style={styles.petName} key={pet.id}>
                  {pet.your_name}
                </Text>
                <Image
                  source={{
                    uri: pet.picture,
                  }}
                  style={styles.image}
                />
              </>
            );
          })}
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}
//cant get the dropdown box to centre when an option is picked
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5cc8d7",
  },
  dropDown: {
    color: "#000",
    justifyContent: "center",
    paddingVertical: 20,
    alignSelf: "center",
  },
  petName: {
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    margin: 30,
    borderRadius: 30,
    marginTop: 6,
  },
});
