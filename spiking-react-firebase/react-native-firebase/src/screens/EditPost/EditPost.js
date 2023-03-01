import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase/config";
import { collection, addDoc, getFirestore } from "@firebase/firestore";
import firebase from "firebase/compat";
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from "react-native-select-dropdown";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { appKey } from "../../components/key";
import Footer from '../Footer/Footer'

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
          style={styles.input}
            placeholder="Enter pet name"
            value={pet_name}
            onChangeText={(e) => {
              setPet_name(e);
            }}
          >
          </TextInput>
          <TextInput
          style={styles.input}
            placeholder="Enter your name"
            value={your_name}
            onChangeText={(e) => {
              setYour_name(e);
            }}
          />
          <TextInput
          style={styles.input}
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
          style={styles.input}
            placeholder="Enter chip id"
            value={chipId}
            onChangeText={(e) => {
              setChipId(e);
            }}
          />
          <SelectDropdown
          defaultButtonText="Select Pet Type"
            style={styles.inputAuto}
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
          style={styles.input}
            placeholder="More details of lost pet"
            value={description}
            onChangeText={(e) => {
              setDescription(e);
            }}
          />
<TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit} >
  <Text style={styles.buttonText}>Submit Changes</Text>
</TouchableOpacity>
         
        </View>
      </ScrollView>
      <Footer/>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5cc8d7",
  },
  title: {
    fontSize: 25,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  inputAuto: {
    height: "auto",
    borderRadius: 5,
    // overflow: "visible",
    backgroundColor: "white",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  buttonContainer: {
    marginRight: 7,
    marginLeft: 7,
    marginTop: 10,
    marginBottom: 7,
    elevation: 8,
    backgroundColor: "#788eec",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
    shadowRadius: 1.5,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  buttonContainerBottom: {
    marginRight: 7,
    marginLeft: 7,
    marginTop: 10,
    marginBottom: 30,
    elevation: 8,
    backgroundColor: "#788eec",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
    shadowRadius: 1.5,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  datePicked: {
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  calendarContainer: {
    marginRight: 7,
    marginLeft: 7,
    marginTop: 10,
    marginBottom: 7,
    elevation: 8,
    backgroundColor: "#788eec",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    shadowRadius: 1.5,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
});
