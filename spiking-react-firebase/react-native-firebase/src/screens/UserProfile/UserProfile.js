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
import uuid from 'react-native-uuid';


export default function UserProfile({ route, extraData }) {
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
  }, [route]);

  const goToChangeProfile = () => {
    navigation.navigate(`EditProfile`);
  };

  const goToChangePost = (pet) => {
    navigation.navigate(`Edit Post`, {pet: pet});
  };

  console.log(pets);
  return (<>

    <ScrollView>
      <View key={uuid.v4()}>
        <Text>User Profile: </Text>
        <Text >{extraData.fullName}</Text>
        <Text>{extraData.id}</Text>
        <Text>{extraData.email}</Text>
        <Button
          style={styles.button}
          onPress={() => goToChangeProfile()}
          title="Edit Profile"
        />
        <Text>Your lost pet posts:</Text>
        {pets.map((pet) => {
          console.log(pet)
          return (
            <>
              <View style={styles.container} key={uuid.v4()}>
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
                  onPress={() => goToChangePost(pet)}
                  title="Edit Post"
                />
              </View>
            </>
          );
        })}
      </View>
    </ScrollView>
    <Footer />
  </>

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
