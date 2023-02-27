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
  VirtualizedList,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
import SelectDropdown from "react-native-select-dropdown";
import { getStorage } from "firebase/storage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Search({ props }) {
  const [pets, setPets] = useState([]);
  const db = firebase.firestore();
  const appKey = "AIzaSyBMITvTV2eJuNap5mXGzkPgMJiQyuf9SRc"; // here app key
  const handlePetTypeSelection = async (petType) => {
    const storage = getStorage();
    const queryPets = await db
      .collection("lost_pets")
      .where("pet_type", "==", petType)
      .get();
    const newPets = [];
    const newURL = []; //
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };

      newPets.push(pet);
    });
    setPets(newPets);
  };

  const petTypes = ["Cat", "Dog", "Rabbit", "Bird", "other"];

  // below;
  // const AutoComp = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [currPlaceId, setPlaceId] = useState("ChIJAZ-GmmbMHkcR_NPqiCq-8HI");
  const [location, setLocation] = useState("");

  const handleSelectItem = (data) => {
    console.log(data, "<<<<<<<<<< DATA");
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${appKey}&place_id=${data.place_id}`
    ).then((response) => {
      response.json().then((responseData) => {
        const { lat, lng } = responseData.result.geometry.location;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);

        const town = responseData.result.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("postal_town")
        )?.long_name;
        const postcode = responseData.result.address_components.find(
          (component) => component.types.includes("postal_code")
        )?.long_name;
        setLocation(town);
        console.log("Town:", town);
        console.log("Postcode:", postcode);
        console.log(responseData.result.address_components);
      });
    });
  };
  // ^^
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data, "<<<<<<<<<<<<");
          handleSelectItem(data);
        }}
        query={{
          key: `${appKey}`,
          language: "en",
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.dropDown}>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            style={{ padding: 10 }}
          />
          <SelectDropdown
            style={styles.dropDown}
            data={petTypes}
            onSelect={(selectedItem, index) => {
              handlePetTypeSelection(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />

          {pets.map((pet) => {
            return (
              <>
                {console.log(location, "<<< LOCATION")}
                {location && pet.location === location ? (
                  <>
                    <Text style={styles.petName} key={pet.id}>
                      {pet.your_name}
                    </Text>
                    <Image
                      source={{
                        uri: pet.picture,
                      }}
                      style={styles.image}
                    />
                  </>
                ) : (
                  <Text>TESTTTTTTTTTTTTTTTTTT</Text>
                )}
              </>
            );
          })}
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5cc8d7",
  },
  dropDown: {
    color: "#000",
    justifyContent: "center",
    paddingVertical: 20,
    alignSelf: "center",
  },
  petName: {
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    margin: 30,
    borderRadius: 30,
    marginTop: 6,
  },
});
