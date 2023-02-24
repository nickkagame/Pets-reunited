import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase/config";
import { collection, addDoc, getFirestore } from "@firebase/firestore";
import firebase from "firebase/compat";
import { useNavigation } from '@react-navigation/native';
const db = firebase.firestore();

export default function EditPost({ route, extraData }) {
  const { pet } = route.params;
  const [pet_name, setPet_name] = useState(pet.pet_name);
  const [your_name, setYour_name] = useState(pet.your_name);
  const [email, setEmail] = useState(pet.email);
  const [home_address, setHome_address] = useState(pet.home_address);
  const [location, setLocation] = useState(pet.location);
  const [chipId, setChipId] = useState(pet.chipId);
  const [pet_type, setPet_type] = useState(pet.pet_type);
  const [description, setDescription] = useState(pet.description);
  const [image, setImage] = useState(pet.picture);
  const [uploading, setUploading] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(pet.lastSeenDate);
  const navigation = useNavigation();
  
  const handleSubmit = () => {
    const newPostInfo = {
      description: description,
      email: email,
      home_address: home_address,
      lastSeenDate: selectedStartDate.toString(),
      chipId: chipId,
      location: location,
      pet_name: pet_name,
      pet_type: pet_type,
      picture: image,
      your_name: your_name,
      userID: extraData.id,
      userProfileEmail: extraData.email,
      userProfileName: extraData.fullName,
    };
    db.collection("lost_pets")
      .doc(pet.id)
      .set(newPostInfo)
      .then((response) => {
        alert("Post updated! 👍");
      }).then(()=>{
        navigation.navigate('UserProfile',{});
      })
      .catch((err) => {
        console.log(err);
        alert("Error - something went wrong :(");
      });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container} key={pet.id}>
          <TextInput
            placeholder="Enter pet name"
            value={pet_name}
            onChangeText={(e) => {
              setPet_name(e);
            }}
          >
          </TextInput>
          <TextInput
            placeholder="Enter your name"
            value={your_name}
            onChangeText={(e) => {
              setYour_name(e);
            }}
          />
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={(e) => {
              setEmail(e);
            }}
          />

          <TextInput
            placeholder="Enter home address"
            value={home_address}
            onChangeText={(e) => {
              setHome_address(e);
            }}
          />
          <TextInput
            placeholder="Enter location where the pet lost"
            value={location}
            onChangeText={(e) => {
              setLocation(e);
            }}
          />
          <TextInput
            placeholder="Enter chip id"
            value={chipId}
            onChangeText={(e) => {
              setChipId(e);
            }}
          />
          <TextInput
            placeholder="Enter pet type"
            value={pet_type}
            onChangeText={(e) => {
              setPet_type(e);
            }}
          />
          <TextInput
            placeholder="More details of lost pet"
            value={description}
            onChangeText={(e) => {
              setDescription(e);
            }}
          />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
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
