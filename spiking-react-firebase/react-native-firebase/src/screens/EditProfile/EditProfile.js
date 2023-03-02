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
  ImageBackground,
} from "react-native";
import firebase from "firebase/compat";
import Footer from "../Footer/Footer";

export default function EditProfile({ route, extraData, setUser }) {
  const { pets } = route.params;
  const db = firebase.firestore();

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
      <ImageBackground
        source={require("../../../assets/PinkTrees.png")}
        style={styles.container}
      >
        <ScrollView style={styles.container}>
          <Text style={styles.bodyText} value={extraData.fullName}>
            Name:{" "}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => {
              setNewName(e);
            }}
          >
            {extraData.fullName}
          </TextInput>
          <Text style={styles.bodyText} value={extraData.fullName}>
            email:{" "}
          </Text>
          <TextInput
            onChangeText={(e) => {
              setNewEmail(e);
            }}
            style={styles.input}
          >
            {extraData.email}
          </TextInput>

          <TouchableOpacity
            style={styles.editButtonContainer}
            onPress={handleSubmit}
          >
            <Text style={styles.editButtonText}>Submit Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
      <Footer pets={pets} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#5cc8d7",
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
  bodyText: {
    fontWeight: "800",
    fontSize: 18,
    margin: 6,
    textAlign: "auto",
    padding: 2,
  },
  editButtonContainer: {
    backgroundColor: "#788eec",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 50,
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    textShadowRadius: 100,
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
