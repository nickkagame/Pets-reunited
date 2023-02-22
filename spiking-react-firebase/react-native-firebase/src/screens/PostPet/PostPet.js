import React, { useEffect, useState } from "react";
import { Text, View, Button, TextInput, Image } from "react-native";
import { collection, addDoc, getDocs, QuerySnapshot, getFirestore } from "@firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { firebase } from "../../firebase/config";
import "firebase/firestore";
import "firebase/compat/firestore";
import "@firebase/firestore";
import "@firebase/storage";
import "@firebase/storage-compat";
import {app } from "../../firebase/config"

const db = getFirestore(app)

export default function PostPet() {
  const [pet_name, setPet_name] = useState("");
  const [your_name, setYour_name] = useState("");
  const [email, setEmail] = useState("");
  const [home_address, setHome_address] = useState("");
  const [location, setLocation] = useState("");
  const [chipId, setChipId] = useState("");
  const [pet_type, setPet_type] = useState("");
  const [description, setDescription] = useState("");
  const [lastSeenDate, setLastSeenDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(null);

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref().child(`Pictures/Image1`)
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log("Download URL: ", url)
          setImage(url)
          blob.close()
          return url
        })
      }
      )
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleSubmit = async () => {
    try {
      const submitRef = await addDoc(collection(db, "lost_pets"),
      {
        description: description, 
email: email,
home_address: home_address,
lastSeenDate: lastSeenDate,
location: location,
pet_name: pet_name,
pet_type: pet_type,
picture: image,
your_name: your_name,

      }) 
    } catch(e) {
      console.error(e)
    }   
  };

  return (
    <View>
      <Text>WELCOME TO LOST PETS PAGE</Text>
      <TextInput
        placeholder="Enter pet name"
        value={pet_name}
        onChangeText={(e) => {
          setPet_name(e);
        }}
      />
      <TextInput
        placeholder="Enter your name"
        value={your_name}
        onChangeText={(e) => {
          setYour_name(e);
        }}
      />
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(e) => {
          setEmail(e);
        }}
      />

      <TextInput
        placeholder="Enter home address"
        value={home_address}
        onChangeText={(e) => {
          setHome_address(e);
        }}
      />
      <TextInput
        placeholder="Enter location where the pet lost"
        value={location}
        onChangeText={(e) => {
          setLocation(e);
        }}
      />
      <TextInput
        placeholder="Enter chip id"
        value={chipId}
        onChangeText={(e) => {
          setChipId(e);
        }}
      />
      <TextInput
        placeholder="Enter pet type"
        value={pet_type}
        onChangeText={(e) => {
          setPet_type(e);
        }}
      />
      <TextInput
        placeholder="More details of lost pet"
        value={description}
        onChangeText={(e) => {
          setDescription(e);
        }}
      />
      <TextInput
        placeholder="Enter last seen date of your pet"
        value={lastSeenDate}
        onChangeText={(e) => {
          setLastSeenDate(e);
        }}
      />
      <Button title="choosepic" onPress={pickImage}/>
      <Button title='Upload Image' onPress={uploadImage} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
