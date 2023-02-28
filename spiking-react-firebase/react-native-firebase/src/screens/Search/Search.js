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
import { TouchableOpacity } from "react-native-gesture-handler";

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
        keyboardShouldPersistTaps={"handled"}
        horizontal={false}
        style={styles.container}
      >
        <SelectDropdown
          keyboardShouldPersistTaps={"handled"}
          horzionatal="false"
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
        <ScrollView
          keyboardShouldPersistTaps={"handled"}
          horizontal={true}
          style={styles.inputAuto}
        >
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
        <>
          {pets.map((pet) => {
            return (
              <TouchableOpacity onPress={() => handlePress(pet)}>
                <Text key={pet.id}>{pet.pet_name}</Text>
                <Image
                  source={{
                    uri: pet.picture,
                  }}
                  style={{ width: 200, height: 200 }}
                />
              </TouchableOpacity>
            );
          })}
        </>
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
  inputAuto: {
    height: "auto",
    borderRadius: 5,
    backgroundColor: "white",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
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

// <>

// <ScrollView
//   keyboardShouldPersistTaps={"handled"}
//   horizontal={false}
//   style={styles.container}
// >
//   <Text style={styles.title}>Report a lost pet</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter pet name (required)"
//     value={pet_name}
//     onChangeText={(e) => {
//       setPet_name(e);
//     }} // req
//   />
//   <TextInput
//     style={styles.input}
//     placeholder="Enter your name (required)"
//     value={your_name}
//     onChangeText={(e) => {
//       setYour_name(e);
//     }}
//   />
//   <TextInput
//     style={styles.input}
//     placeholder="Enter email (required)"
//     value={email}
//     onChangeText={(e) => {
//       setEmail(e);
//     }}
//   />
//   {/* <TextInput
//     style={styles.input}
//     placeholder="Enter home address"
//     value={home_address}
//     onChangeText={(e) => {
//       setHome_address(e);
//     }}
//   /> */}
//   <ScrollView
//     keyboardShouldPersistTaps={"handled"}
//     horizontal={true}
//     style={styles.inputAuto}
//   >
//     <AutoComp setLocation={setLocation} setCoordinates ={setCoordinates} setTown = {setTown}
// setPostcode = {setPostcode}/>
//   </ScrollView>
//   <TextInput
//     style={styles.input}
//     placeholder="Enter chip id (optional)"
//     value={chipId}
//     onChangeText={(e) => {
//       setChipId(e);
//     }}
//   />
//   <TextInput
//     style={styles.input}
//     placeholder="Enter pet type (required)"
//     value={pet_type}
//     onChangeText={(e) => {
//       setPet_type(e);
//     }}
//   />
//   <TextInput
//     style={styles.input}
//     placeholder="More details of lost pet (required)"
//     value={description}
//     onChangeText={(e) => {
//       setDescription(e);
//     }}
//   />
//   <Text style={styles.datePicked}>
//     {date.toString() === "Invalid Date"
//       ? "Please pick a date"
//       : date.toString()}
//   </Text>
//   {/* {console.log(date.toString())} */}
//   <TouchableOpacity
//     style={styles.calendarContainer}
//     onPress={() => {
//       setIsClicked(true);
//     }}
//   >
//     {isClicked ? (
//       <CalendarPopUp setSelectedStartDate={setSelectedStartDate} />
//     ) : (
//       ""
//     )}
//     <Text style={styles.buttonText}>Pick date lost</Text>
//   </TouchableOpacity>

//   <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
//     <Text style={styles.buttonText}>Choose pic</Text>
//   </TouchableOpacity>

//   {!uploading ? <TouchableOpacity style={styles.buttonContainer} onPress={uploadImage}>
//     <Text style={styles.buttonText}>Upload Image</Text>
//   </TouchableOpacity>:  <ActivityIndicator size={'small'} color='black' />}

//   <TouchableOpacity
//     style={styles.buttonContainerBottom}
//     onPress={handleSubmit}
//   >
//     <Text style={styles.buttonText}>Submit</Text>
//   </TouchableOpacity>
// </ScrollView>
// <Footer />
// </>
// );
// }

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// backgroundColor: "#5cc8d7",
// },
// title: {
// fontSize: 25,
// color: "#000",
// justifyContent: "center",
// paddingVertical: 12,
// paddingHorizontal: 32,
// alignSelf: "center",
// fontWeight: "bold",
// },
// input: {
// height: 48,
// borderRadius: 5,
// overflow: "hidden",
// backgroundColor: "white",
// marginTop: 6,
// marginBottom: 6,
// marginLeft: 30,
// marginRight: 30,
// paddingLeft: 16,
// },
// inputAuto: {
// height: "auto",
// borderRadius: 5,
// // overflow: "visible",
// backgroundColor: "white",
// marginTop: 6,
// marginBottom: 6,
// marginLeft: 30,
// marginRight: 30,
// paddingLeft: 16,
// },
