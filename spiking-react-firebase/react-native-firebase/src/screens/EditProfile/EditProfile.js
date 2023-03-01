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
  TouchableOpacity,
} from "react-native";
// import firebase from "firebase/compat";
// import { useNavigation } from "@react-navigation/native";
import Footer from "../Footer/Footer";
import db from "../HomeScreen/HomeScreen";

export default function EditProfile({ route, extraData, setUser }) {
  const { pets } = route.params;
  console.log(extraData);
  // const db = firebase.firestore();
  // const navigation = useNavigation();

  const [newName, setNewName] = useState(extraData.fullName);
  const [newEmail, setNewEmail] = useState(extraData.email);

  const handleSubmit = () => {
    const newUserInfo = {
      fullName: newName,
      email: newEmail,
      id: extraData.id,
    };
    db.collection("users")
      .doc(extraData.id)
      .set(newUserInfo)
      .then((response) => {
        setUser(newUserInfo);
        alert("User profile updated! 👍");
      })
      .catch((err) => {
        console.log(err);
        alert("Error - something went wrong :(");
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Name: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            setNewName(e);
          }}
        >
          {extraData.fullName}
        </TextInput>
        <Text style={styles.title} value={extraData.fullName}>
          Email:{" "}
        </Text>
        <TextInput
          onChangeText={(e) => {
            setNewEmail(e);
          }}
          style={styles.input}
        >
          {extraData.email}
        </TextInput>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Changes</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer pets={pets} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5cc8d7",
  },
  title: {
    fontSize: 20,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "auto",
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  inputAuto: {
    height: "auto",
    borderRadius: 5,
    // overflow: "visible",
    backgroundColor: "white",
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  buttonContainer: {
    marginRight: 7,
    marginLeft: 7,
    marginTop: 10,
    marginBottom: 7,
    elevation: 8,
    backgroundColor: "#788eec",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
    shadowRadius: 1.5,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  buttonContainerBottom: {
    marginRight: 7,
    marginLeft: 7,
    marginTop: 10,
    marginBottom: 30,
    elevation: 8,
    backgroundColor: "#788eec",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
    shadowRadius: 1.5,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  datePicked: {
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  calendarContainer: {
    marginRight: 7,
    marginLeft: 7,
    marginTop: 10,
    marginBottom: 7,
    elevation: 8,
    backgroundColor: "#788eec",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    shadowRadius: 1.5,
    shadowOpacity: 0.5,
    shadowColor: "black",
  },
});
