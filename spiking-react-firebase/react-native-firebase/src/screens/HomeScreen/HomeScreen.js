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
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
import { getPets } from "../../components/api";

export default function HomeScreen({ props, extraData }) {
  const [pets, setPets] = useState([]);

  console.log(extraData);

  const navigation = useNavigation();

  const onPostButtonPress = () => {
    navigation.navigate("PostPet");
  };

  useEffect(() => {
    getPets().then((newPets) => setPets(newPets));
  }, []);

  const handlePress = (pet) => {
    navigation.navigate("PetSingle", { pet: pet });
  };

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

  if (pets.length === 0) {
    return <ActivityIndicator />;
  } else {
    return (
      <>
        <View>
          <TouchableOpacity onPress={() => onPostButtonPress()}>
            <Text>POST LOST PET</Text>
          </TouchableOpacity>
          <FlatList
            data={pets}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePress(item)}>
                <>
                  <Text>{item.pet_name}</Text>
                  <Image
                    source={{
                      uri: item.picture,
                    }}
                    style={{ width: 200, height: 200 }}
                  />
                </>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <Footer />
      </>
    );
  }
}
