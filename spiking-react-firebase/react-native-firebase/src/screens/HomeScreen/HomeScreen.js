import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import firebase from "firebase/compat";
import { ScrollView } from "react-native-gesture-handler";
import { getStorage } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";

export const db = firebase.firestore();

export default function HomeScreen({ props, extraData }) {
  const [pets, setPets] = useState([]);

  // console.log(extraData);

  const navigation = useNavigation();

  const onPostButtonPress = () => {
    navigation.navigate("PostPet");
  };

  const getPets = async () => {
    const storage = getStorage();
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    const newURL = [];
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      newPets.push(pet);
      newURL.push(pet.picture);
    });

    setPets(newPets);
  };
  useEffect(() => {
    getPets();
  }, []);

  const handlePress = (pet, pets) => {
    // console.log("====>  ", pets);
    navigation.navigate("PetSingle", { pet: pet, pets: pets });
  };

  if (pets.length === 0) {
    return <ActivityIndicator />;
  } else {
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.reportButtonContainer}
            onPress={() => onPostButtonPress()}
          >
            <Text style={styles.reportButtonText}>Report a lost pet</Text>
          </TouchableOpacity>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={pets}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item, pets)}>
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
          />
        </View>
        <Footer pets={pets} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5cc8d7",
  },
  reportButtonContainer: {
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
  reportButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
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
