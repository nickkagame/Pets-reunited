import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import firebase from "firebase/compat";
import { ScrollView } from "react-native-gesture-handler";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigation } from '@react-navigation/native';
import Footer from "../Footer/Footer";

const db = firebase.firestore();

export default function HomeScreen({ props }) {
  const [pets, setPets] = useState([]);

  const navigation = useNavigation();
  
  const onPostButtonPress = () => {
    
    navigation.navigate('PostPet');
  }


  const getPets = async () => {
    const storage = getStorage();
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    const newURL = []; //
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      newPets.push(pet);
      newURL.push(pet.picture); //
    });
    setPets(newPets);

  };
  useEffect(() => {
    getPets();
  }, []);
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
  return (
    <ScrollView>
      <View>
      <TouchableOpacity  
          onPress={() => onPostButtonPress()}
        >
          <Text >POST LOST PET</Text>
        </TouchableOpacity>
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
          );
        })}
      </View>
      <View >
       <Footer />
      </View>
    </ScrollView>
  );
}

