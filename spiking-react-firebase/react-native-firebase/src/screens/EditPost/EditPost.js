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
import SelectDropdown from "react-native-select-dropdown";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { appKey } from "../../components/key";

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
  const [coordinates, setCoordinates] = useState(pet.coordinates);
  const [postcode, setPostcode] = useState(pet.postcode);
  const [town, setTown] = useState(pet.town)
  const [uploading, setUploading] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(pet.lastSeenDate);
  const navigation = useNavigation();  
  
  const handleSubmit = () => {
    const newPostInfo = {
      description: description,
      email: email,
      lastSeenDate: selectedStartDate.toString(),
      chipId: chipId,
      location: location,
      pet_name: pet_name,
      pet_type: pet_type,
      picture: image,
      your_name: your_name,
      coordinates,
      town,
      postcode,
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

  const handleSelectItem = (data) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${appKey}&place_id=${data.place_id}`
    ).then((response) => {
      response.json().then((responseData) => {
        // console.log(data);
        const { lat, lng } = responseData.result.geometry.location;
        setCoordinates(responseData.result.geometry.location)

        const town = responseData.result.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("postal_town")
        )?.long_name;
        const postcode = responseData.result.address_components.find(
          (component) => component.types.includes("postal_code")
        )?.long_name;
        setTown(town);
        if (postcode) {
          setPostcode(postcode);
        } 
      });
    });
  
  };

  const petTypes = ["Cat", "Dog", "Rabbit", "Bird", "other"];

  return (
    <>
      <ScrollView keyboardShouldPersistTaps={"handled"}
        horizontal={false}>
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
          <ScrollView
          keyboardShouldPersistTaps={"handled"}
          horizontal={true}
          style={styles.inputAuto}
        >
          <GooglePlacesAutocomplete
      placeholder="Enter location where the pet was lost"
      onPress={(data, details = null) => {
        setLocation(data.description);
        handleSelectItem(data);
      }}
      query={{
        key: `${appKey}`,
        language: "en",
      }}
    />
        </ScrollView>
          <TextInput
            placeholder="Enter chip id"
            value={chipId}
            onChangeText={(e) => {
              setChipId(e);
            }}
          />
          <SelectDropdown
            style={styles.input}
            data={petTypes}
            onSelect={(selectedItem, index) => {
              setPet_type(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
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
