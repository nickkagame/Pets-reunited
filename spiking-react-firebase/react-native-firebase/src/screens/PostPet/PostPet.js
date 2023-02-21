import React, { useEffect, useState } from "react";
import { Text, View, Button, TextInput } from "react-native";
import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import Picker from 'react-native-picker';

export default function PostPet() {
  const [pet_name, setPet_name] = useState("");
  const [your_name, setYour_name] = useState("");
  const [email, setEmail] = useState("");
  const [home_address, setHome_address] = useState("");
  const [location, setLocation] = useState("");
  const [chipId, setChipId] = useState("");
  const [picture, setPicture] = useState("");
  const [pet_type, setPet_type] = useState("");
  const [description, setDescription] = useState("");
  const [lastSeenDate, setLastSeenDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSubmit = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    // You can add your own logic to submit the form data here
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
        placeholder="Upload picture"
        value={picture}
        onChangeText={(e) => {
          setPicture(e);
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
