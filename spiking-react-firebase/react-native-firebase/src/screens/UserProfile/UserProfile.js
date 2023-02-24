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
import EditProfile from "../EditProfile/EditProfile"


export default function Search({ extraData }) {
  const [pets, setPets] = useState([]);
  const db = firebase.firestore();
  const navigation = useNavigation();

  const getUserPost = async () => {
    const storage = getStorage();
    const queryPets = await db
      .collection("lost_pets")
      .where("userID", "==", extraData.id)
      .get();
    const newPets = [];
    const newURL = []; //
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };

      newPets.push(pet);
    });
    setPets(newPets);
  };

  useEffect(() => {
    getUserPost();
  }, []);

  const handleProfile = () => {
    navigation.navigate(`EditProfile`);
  };

  console.log(pets);
  return (
    <ScrollView>
      <View>
        <Text>User Profile: </Text>
        <Text>{extraData.fullName}</Text>
        <Text>{extraData.id}</Text>
        <Text>{extraData.email}</Text>
        <Button
          style={styles.button}
          onPress={() => handleProfile()}
          title="Edit Profile"
        />
        <Text>Your post:</Text>
        {pets.map((pet) => {
          return (
            <>
              <View style={styles.container} key={pet.id}>
                <Text style={styles.title}>
                  Hello! My name is {pet.pet_name} the {pet.pet_type}
                </Text>
                <Image
                  source={{ uri: pet.picture }}
                  style={{ width: 200, height: 200 }}
                />
                <Text>My home is in {pet.description}.</Text>
                <Text>
                  I was last seen on {} around the {pet.location} area :
                </Text>
                <Text>I really miss my owner {pet.your_name}</Text>
                <Button
                  style={styles.button}
                  onPress={() => handlePost()}
                  title="Edit Post"
                />
              </View>
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
