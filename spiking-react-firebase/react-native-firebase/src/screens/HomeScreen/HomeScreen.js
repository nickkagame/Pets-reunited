import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View, Image } from "react-native";
import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import firebase from "firebase/compat";
import { ScrollView } from "react-native-gesture-handler";
// import storage from "@react-native-firebase/storage"; //
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const db = firebase.firestore();

export default function HomeScreen({ props }) {
  const [pets, setPets] = useState([]);
  const [imageUrl, setImageUrl] = useState(null); //

  const getPets = async () => {
    const storage = getStorage();
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    const newURL = []; //
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      newPets.push(pet);
      newURL.push(pet.picture); //
      // console.log(newURL);
    });

    // something.forEach((imgname) => {
    //   const reference
    // })
    // console.log(pets, " <<<<<<<<<< PETS VARIABLE");
    setPets(newPets);

    const storageRef = async () => {
      let newPets2 = [];
      pets.forEach((pet) => {
        newPets2 = { ...pet, urlRef: ref(storage, pets.picture) };
        console.log(newPets2);
      });

      // await getDownloadURL(pet.urlRef);
      // setPets(newPets2);
      // console.log(pets2);

      const reference = ref(storage, pets[0].picture);

      await getDownloadURL(reference).then((pic) => {
        setImageUrl(pic);
      });
      // console.log(pets[1].picture);
      // console.log(pets);
    };
    storageRef();
  };

  useEffect(() => {
    getPets();
  }, [imageUrl]);

  return (
    <ScrollView>
      <View>
        {pets.map((pet) => {
          return (
            <ScrollView key={pet.id}>
              <Text>{pet.your_name}</Text>
              <Image
                source={{
                  uri: pet.picture,
                }}
                style={{ width: 200, height: 200 }}
              />
            </ScrollView>
          );
        })}
      </View>
    </ScrollView>
  );
}
