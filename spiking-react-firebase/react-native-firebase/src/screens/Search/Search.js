import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
import SelectDropdown from "react-native-select-dropdown";
import { getStorage } from "firebase/storage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function Search({ props }) {
  const [pets, setPets] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [currPlaceId, setPlaceId] = useState("ChIJAZ-GmmbMHkcR_NPqiCq-8HI");
  const [location, setLocation] = useState("");
  const [typeChosen, setTypeChosen] = useState("false");
  const [petType, setPetType] = useState("");

  const db = firebase.firestore();
  const appKey = "AIzaSyBMITvTV2eJuNap5mXGzkPgMJiQyuf9SRc"; // here app key

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
    }
    //seperate out so can use both seperately
  };

  const petTypes = ["Cat", "Dog", "Rabbit", "Bird", "other"];

  console.log(location, " <------");

  const handleSelectItem = (data) => {
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

  const navigation = useNavigation();

  const handlePress = (pet) => {
    navigation.navigate("PetSingle", { pet: pet });
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps={"handled"} horzionatal="true"
        style={styles.container}
      >
        <SelectDropdown
        keyboardShouldPersistTaps={"handled"} horzionatal="false"
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
        <ScrollView keyboardShouldPersistTaps={"handled"} horzionatal="false">
          <GooglePlacesAutocomplete
            placeholder="Search by Location"
            onPress={(data, details = null) => {
              handleSelectItem(data);
            }}
            query={{
              key: `${appKey}`,
              language: "en",
            }}
          />
        </ScrollView>
        {/* <FlatList
          // keyboardShouldPersistTaps={"handled"}
          horzionatal="false"
          showsVerticalScrollIndicator={false}
          data={pets}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <>
                <Text style={styles.petName}>{item.pet_name}</Text>
                <Image
                  source={{
                    uri: item.picture,
                  }}
                  style={styles.image}
                />
              </>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        /> */}
        <ScrollView  keyboardShouldPersistTaps={"handled"} horzionatal="false">
          {pets.map((pet) => {
            return (
              <>
                <Text key={pet.id}>{pet.your_name}</Text>
                <Image
                  source={{
                    uri: pet.picture,
                  }}
                  style={{ width: 200, height: 200 }}
                />
              </>
            );
          })}
        </ScrollView>
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
