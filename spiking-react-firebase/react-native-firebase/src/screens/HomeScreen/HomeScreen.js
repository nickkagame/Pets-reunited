import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
// import { query, orderBy, limit } from "firebase/firestore";
import SelectDropdown from "react-native-select-dropdown";

// const q = query(citiesRef, orderBy("name"), limit(3));


export const db = firebase.firestore();

export default function HomeScreen({ props, extraData }) {
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [sortBy, setSortBy] = useState("pet_name");

  const navigation = useNavigation();

  const onPostButtonPress = () => {
    navigation.navigate("PostPet");
  };

  const getPets = async () => {
    const queryPets = await db
      .collection("lost_pets")
      .orderBy(sortBy, "desc")
      .get();
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
  }, [sortBy]);

  const handlePress = (pet, pets) => {
    navigation.navigate("PetSingle", { pet: pet, pets: pets });
  };

  // const postListSorted = pets.sort((a, b) => {
  //   return b.lastSeenDate
  //     .slice(8, 15)
  //     .localeCompare(a.lastSeenDate.slice(8, 15));
  // });

  // pets.forEach((pet) => console.log(pet.lastSeenDate));
  const handleSort = (sort) => {
    setSortBy(sort);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  console.log("*");
  // pets.forEach((pet) => console.log(pet.pet_name));

  if (pets.length === 0) {
    return <ActivityIndicator />;
  } else {
    return (
      <>
        <View style={styles.container}>
          <SelectDropdown
            keyboardShouldPersistTaps={"handled"}
            horzionatal="false"
            // style={styles.dropDown}
            data={["lastSeenDate", "pet_name"]}
            onSelect={(selectedItem, index) => {
              handleSort(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
          <TouchableOpacity
            style={styles.reportButtonContainer}
            onPress={() => onPostButtonPress()}
          >
            <Text style={styles.reportButtonText}>Report a lost pet</Text>
          </TouchableOpacity>
          <FlatList
            maxToRenderPerBatch={1}
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
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
