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
import { getStorage } from "firebase/storage";
import uuid from "react-native-uuid";
import { TouchableOpacity } from "react-native-gesture-handler";

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

  const { pet } = route.params;
  const goToChangeProfile = (pets) => {
    navigation.navigate(`EditProfile`, { pets: pets, extraData: extraData });
  };

  const goToChangePost = (pet) => {
    navigation.navigate(`Edit Post`, { pet: pet, pets: pets });
  };

  return (
    <>
      <ScrollView styles={styles.container}>
        <View key={uuid.v4()}>
          {/* <Text style={styles.user} >Profile information: </Text> */}
          <Text style={styles.bodyText}> Name: </Text>
          <Text style={styles.bodyText2}> {extraData.fullName} </Text>
          <Text style={styles.bodyText}> email: </Text>
          <Text style={styles.bodyText2}> {extraData.email} </Text>
          <TouchableOpacity
            style={styles.editButtonContainer}
            onPress={() => goToChangeProfile(pets)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.user}>Your lost pets:</Text>
        {pets.map((pet) => {
          return (
            <View style={styles.container} key={uuid.v4()}>
              <Text style={styles.title}>{pet.pet_name}</Text>
              <Image source={{ uri: pet.picture }} style={styles.postImage} />
              <TouchableOpacity
                style={styles.editButtonContainer}
                onPress={() => goToChangePost(pet)}
                title="Edit Post"
              >
                <Text style={styles.editButtonText}>Edit Post</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      <Footer pets={pets} pet={pet} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#5cc8d7",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    padding: 2,
    margin: 3,
    // backgroundColor: "white",
    // borderRadius: 8,
    // paddingVertical: 45,
    // paddingHorizontal: 25,
    // width: "100%",
    // marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: "yellow",
    padding: 40,
  },
  editButtonContainer: {
    width: "90%",
    alignSelf: "center",
    // backgroundColor: "#f0f8ff",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 15,
    marginBottom: 15,
    shadowRadius: 1.5,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  editButtonText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    // textTransform: "uppercase",
  },
  user: {
    fontWeight: "bold",
    margin: 10,
    fontSize: 20,
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  bodyText: {
    fontWeight: "800",
    fontSize: 18,
    margin: 6,
    textAlign: "auto",
    padding: 2,
  },
  bodyText2: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 6,
    textAlign: "auto",
    padding: 2,
    color: `#696969`,
    marginBottom: 3,
  },

  postImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    margin: 30,
    borderRadius: 30,
    marginTop: 6,
  },
});
