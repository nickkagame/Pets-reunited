import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import firebase from "firebase/compat";
import { ScrollView } from "react-native-gesture-handler";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";

const db = firebase.firestore();

export default function HomeScreen({ props, extraData }) {

  
  const [pets, setPets] = useState([]);

  console.log(extraData)

  const navigation = useNavigation();

  const onPostButtonPress = () => {
    navigation.navigate("PostPet");
  };

  const getPets = async () => {
    const storage = getStorage();
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    const newURL = [];
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      newPets.push(pet);
      newURL.push(pet.picture);
    });

    setPets(newPets);
  };
  useEffect(() => {
    getPets();
  }, []);

  const handlePress = (pet) => {
    navigation.navigate("PetSingle", { pet: pet });
  };

  if (pets.length === 0) {
    return <ActivityIndicator />;
  } else {
    return (
      <View>
        <TouchableOpacity onPress={() => onPostButtonPress()}>
          <Text>POST LOST PET</Text>
        </TouchableOpacity>
        <FlatList
          data={pets}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <>
                <Text>{item.pet_name}</Text>
                <Image
                  source={{
                    uri: item.picture,
                  }}
                  style={{ width: 200, height: 200 }}
                />
              </>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}
