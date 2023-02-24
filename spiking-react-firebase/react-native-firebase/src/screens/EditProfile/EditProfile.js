import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";

export default function Search({ extraData, setUser }) {
  const [pets, setPets] = useState([]);
  const db = firebase.firestore();
  const navigation = useNavigation();

 const [newName, setNewName] = useState(extraData.fullName) 
const [newEmail, setNewEmail] = useState(extraData.email)
 
console.log(extraData)

  const handleSubmit = () => {
   const newUserInfo = {fullName: newName,
   email: newEmail,
   id: extraData.id
   }
    db.collection("users").doc(extraData.id).set(newUserInfo)
      .then((response)=> {
        setUser(newUserInfo)
        alert("User profile updated! 👍");
      }).catch((err)=> {
        console.log(err)
        alert("Error - something went wrong :(")
      })
      
  };


  return (
    <ScrollView>
      <View>
        <Text value={extraData.fullName}>User Profile: </Text>
        <TextInput onChangeText={(e) => {
          setNewName(e);
        }}>{extraData.fullName}</TextInput>
        <TextInput onChangeText={(e) => {
          setNewEmail(e);
        }}>{extraData.email}</TextInput>
        <Button
          style={styles.button}
          onPress={handleSubmit}
          title="Submit Changes"
        />  
        <Footer />
      </View>
    </ScrollView>
  );
}

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
