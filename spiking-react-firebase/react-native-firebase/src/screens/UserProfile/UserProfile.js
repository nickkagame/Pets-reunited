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

  const goToChangeProfile = () => {
    navigation.navigate(`EditProfile`);
  };

  const goToChangePost = (pet) => {
    navigation.navigate(`Edit Post`, {pet: pet});
  };

  return (<>
    <ScrollView styles ={styles.container}>
      <View key={uuid.v4()}>
        {/* <Text style={styles.user} >Profile information: </Text> */}
        <Text style={styles.bodyText}> Your name:            {extraData.fullName}   </Text>
        <Text style={styles.bodyText}> UserID:  {extraData.id}   </Text>
        <Text style={styles.bodyText}> {extraData.email}  </Text>
        <TouchableOpacity
                  style={styles.editButtonContainer}
                  onPress={() => goToChangeProfile()}
                >
               <Text style={styles.editButtonText}>Edit Profile</Text>

                </TouchableOpacity>
                </View>
        <Text style={styles.user} >Your lost pet posts:</Text>
        {pets.map((pet) => {
          return (
            <>
              <View style={styles.container} key={uuid.v4()}>
                <Text style={styles.title}>
                  {pet.pet_name} 
                </Text>
                <Image
                  source={{ uri: pet.picture }}
                  style={styles.postImage}
                />
                <TouchableOpacity
                  style={styles.editButtonContainer}
                  onPress={() => goToChangePost(pet)}
                  title="Edit Post"
                >
               <Text style={styles.editButtonText}>Edit Post</Text>

                </TouchableOpacity>
        
              </View>
            </>
          );
        })}
      
    </ScrollView>
    <Footer />
  </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    textAlign: "center"
  },
  content: {
    flex: 1,
  },
  footer: {
    backgroundColor: "yellow",
    padding: 40,
  },
  editButtonContainer: {
    backgroundColor: "#788eec",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    marginBottom: 15,
    shadowRadius: 1.5,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  editButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
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
    fontWeight: "bold",
    margin: 10,
    textAlign: "centre",
  },

  postImage: {
    width: 200,
    height: 200,
    alignSelf: "center",
    margin: 30,
    borderRadius: 30,
    marginTop: 6,
  }
});

