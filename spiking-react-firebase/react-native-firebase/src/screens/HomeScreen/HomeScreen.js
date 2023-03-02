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

import SelectDropdown from "react-native-select-dropdown";

export const db = firebase.firestore();

export default function HomeScreen({ props, extraData }) {
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [sortBy, setSortBy] = useState("pet_name");

  const navigation = useNavigation();

  const onPostButtonPress = () => {
    navigation.navigate("Report Lost Pet");
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
    navigation.navigate("Lost Pet", { pet: pet, pets: pets });
  };

  const handleSort = (sort) => {
    setSortBy(sort);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
          <SelectDropdown
            defaultButtonText={"Sort pets by..."}
            buttonTextStyle={styles.buttonTextStyle}
            keyboardShouldPersistTaps={"handled"}
            horzionatal="false"
            buttonStyle={styles.selectDropdown}
            dropdownStyle={styles.dropDown}
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
          <FlatList
            style={[styles.container1, styles.elevation]}
            maxToRenderPerBatch={1}
            showsVerticalScrollIndicator={false}
            data={pets}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.container1, styles.elevation]}
                onPress={() => handlePress(item, pets)}
              >
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
    backgroundColor: "lightgrey",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  container1: {
    textAlign: "center",
    borderColor: "black",
    borderWidth: 0,
    padding: 2,
    margin: 10,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  elevation: {
    elevation: 2,
    shadowColor: "black",
  },
  content: {
    flex: 1,
  },
  dropDown: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
    backgroundColor: "#788eec",
    opacity: 0.9,
  },
  reportButtonContainer: {
    backgroundColor: "#788eec",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 15,
    borderColor: "black",
    borderWidth: 1,
  },
  selectDropdown: {
    backgroundColor: "#788eec",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 1,
    alignSelf: "center",
    height: 40,
  },
  reportButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textShadowRadius: 100,
  },
  petName: {
    fontSize: 20,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "95%",
    height: 300,
    alignSelf: "center",
  },
  sortby: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textShadowRadius: 100,
  },
});
