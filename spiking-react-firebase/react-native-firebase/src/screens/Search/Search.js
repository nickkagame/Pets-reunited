import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
import SelectDropdown from "react-native-select-dropdown";
import { getStorage } from "firebase/storage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TouchableOpacity } from "react-native-gesture-handler";
import uuid from "react-native-uuid";

export default function Search({ props }) {
  const [pets, setPets] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [currPlaceId, setPlaceId] = useState("ChIJAZ-GmmbMHkcR_NPqiCq-8HI");
  const [location, setLocation] = useState("");
  const [typeChosen, setTypeChosen] = useState("false");
  const [petType, setPetType] = useState("");

  const ref = useRef(); //

  const db = firebase.firestore();
  const appKey = "AIzaSyBMITvTV2eJuNap5mXGzkPgMJiQyuf9SRc";

  const handlePetTypeSelection = async (petType) => {
    setPetType(petType);
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
    if (location) {
      const formattedPets = newPets.filter((pet) => {
        return pet.town === location;
      });
      setPets(formattedPets);
    } else {
      setPets(newPets);
      setTypeChosen(true);
      // setLocation('')
    }
  };
  const navigation = useNavigation();

  const reset = () => {
    setPets([]);
    // setPetType("");
    // setLocation("");
    navigation.navigate("Search", { location, petType, pets });
  };

  const petTypes = ["Cat", "Dog", "Rabbit", "Bird", "other"];

  const handleSelectItem = (data) => {
    setLocation("");
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${appKey}&place_id=${data.place_id}`
    ).then((response) => {
      response.json().then((responseData) => {
        const { lat, lng } = responseData.result.geometry.location;
        const town = responseData.result.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("postal_town")
        )?.long_name;

        db.collection("lost_pets")
          .where("town", "==", town)
          .get()
          .then((res) => {
            const newPets = [];
            res.forEach((doc) => {
              const pet = { ...doc.data(), id: doc.id };

              newPets.push(pet);
            });
            setLocation(town);
            if (petType) {
              const formattedPets = newPets.filter((pet) => {
                return pet.pet_type === petType;
              });
              setPets(formattedPets);
            } else {
              setPets(newPets);
            }
          });
      });
    });
  };

  const handlePress = (pet) => {
    navigation.navigate("PetSingle", { pet: pet });
  };

  return (
    <>
      <ImageBackground
        source={require("../../../wireframe/wp6560668.jpg")}
        style={styles.container}
      >
        <ScrollView
          keyboardShouldPersistTaps={"handled"}
          horizontal={false}
          style={styles.scrollContainer}
        >
          <GooglePlacesAutocomplete
            placeholder="Search by Location"
            style={styles.googleMapsDD} //
            onPress={(data, details = null) => {
              handleSelectItem(data);
              ref.current.setAddressText(""); //
            }}
            query={{
              key: `${appKey}`,
              language: "en",
            }}
            ref={ref}
          />
          <SelectDropdown
            defaultButtonText="Select animal type"
            buttonTextStyle={styles.buttonTextStyle}
            keyboardShouldPersistTaps={"handled"}
            horizontal={false}
            buttonStyle={styles.selectDropdown}
            dropdownStyle={styles.dropDown}
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
          {/* {Clear search does not clear the ANimal type filter above ^^ Did it before?? } */}
          <TouchableOpacity style={styles.clearSearchButton} onPress={reset}>
            <Text style={styles.buttonTitle}>Clear search</Text>
          </TouchableOpacity>
          <>
            {pets.map((pet) => {
              return (
                <TouchableOpacity
                  key={uuid.v4()}
                  onPress={() => handlePress(pet)}
                >
                  <Text style={styles.petName}>{pet.pet_name}</Text>
                  <Image
                    source={{
                      uri: pet.picture,
                    }}
                    style={styles.image}
                  />
                </TouchableOpacity>
              );
            })}
          </>
        </ScrollView>
      </ImageBackground>
      <Footer pets={pets} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    marginTop: 20,
    width: "90%",
  },
  selectDropdown: {
    backgroundColor: "#788eec",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: "center",
    height: 40,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  googleMapsDD: {
    marginTop: 7,
    margin: 20,
    borderRadius: 8,
  },
  dropDown: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    backgroundColor: "#788eec",
    opacity: 0.9,
  },
  petName: {
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  inputAuto: {
    marginTop: 10,
    paddingRight: 0,
    paddingLeft: 0,
    opacity: 0.9,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
    margin: 30,
    marginTop: 6,
    borderRadius: 30,
  },
  buttonTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearSearchButton: {
    backgroundColor: "#788eec",
    marginLeft: 100,
    marginRight: 100,
    marginTop: 15,
    marginBottom: 20,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
