import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View, Image } from "react-native";
import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import firebase from "firebase/compat";
import { ScrollView } from "react-native-gesture-handler";
import storage from "@react-native-firebase/storage"; //

const db = firebase.firestore();

export default function HomeScreen({ props }) {
  const [pets, setPets] = useState([]);
  const [imageUrl, setImageUrl] = useState(null); //

  const getPets = async () => {
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      newPets.push(pet);
    });
    // console.log(pets, " <<<<<<<<<< PETS VARIABLE");
    setPets(newPets);
  };

  useEffect(() => {
    getPets();
  }, []);

  const baseStorageUrl =
    "https://firebasestorage.googleapis.com/v0/b/pets-reunited.appspot.com/o/";

  // const newURL = baseStorageUrl + pets[0].picture;
  const newURL = baseStorageUrl;
  // console.log(pets[1].picture.slice(31), "PETS URL <<<<<<<<<<<<<<<<");
  // console.log(baseStorageUrl, "BASE URL <<<<<<<<<<<<<<<<");
  // console.log(newURL, "NEW URL <<<<<<<<<<<<<<<<");
  return (
    <ScrollView>
      <View>
        {pets.map((pet) => {
          //   let img = pet.picture;
          return (
            <ScrollView key={pet.id}>
              <Text>{pet.your_name}</Text>
              <Image
                source={{
                  uri: baseStorageUrl + encodeURIComponent(pet.picture),
                }}
                style={{ width: 200, height: 200 }}
              />
            </ScrollView>
          );
        })}
      </View>
    </ScrollView>
  );
}
