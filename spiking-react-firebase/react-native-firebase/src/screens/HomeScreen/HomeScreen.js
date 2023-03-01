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
  ImageBackground
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
      
      
      
        <ImageBackground
      source={require("../../../wireframe/wp6560668.jpg")}
      styles={styles.backgroundImage}
    >
        
          <TouchableOpacity
            style={styles.reportButtonContainer}
            onPress={() => onPostButtonPress()}
          >
            <Text style={styles.reportButtonText}>Report a lost pet</Text>
          </TouchableOpacity>
          <SelectDropdown
          style={styles.sortby}
            keyboardShouldPersistTaps={"handled"}
            horzionatal="false"
            defaultButtonText={"Sort Pets by..."}
            
            data={["Date", "Name"]}
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
          <Footer pets={pets} />
       
          </ImageBackground>
  
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5cc8d7",
    margin: 'auto'
  },
  backgroundImage: {  
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: 'auto'
  },
  reportButtonContainer: {
    backgroundColor: "#788eec",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    marginBottom: 15,
  },
  reportButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textShadowRadius: 100
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
    margin: 15,
    borderRadius: 30,
    marginTop: 3,
  },
  sortby: { 
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textShadowRadius: 100},
});
