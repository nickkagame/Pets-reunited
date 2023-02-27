import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { appKey } from "./key";
// import axios from 'axios'

export const AutoComp = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [currPlaceId, setPlaceId] = useState("ChIJAZ-GmmbMHkcR_NPqiCq-8HI");

  const handleSelectItem = (data) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${appKey}&place_id=${data.place_id}`
    ).then((response) => {
      response.json().then((responseData) => {
        // console.log(data);
        const { lat, lng } = responseData.result.geometry.location;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);

        const town = responseData.result.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("postal_town")
        )?.long_name;
        const postcode = responseData.result.address_components.find(
          (component) => component.types.includes("postal_code")
        )?.long_name;
        console.log("Town:", town);
        console.log("Postcode:", postcode);
        console.log(responseData.result.address_components);
      });
    });
  };

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        console.log(data, "<<<<<<<<<<<<");
        handleSelectItem(data);
      }}
      query={{
        key: `${appKey}`,
        language: "en",
      }}
    />
  );
};
