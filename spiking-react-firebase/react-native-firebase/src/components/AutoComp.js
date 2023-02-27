import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { appKey } from "./key";

export const AutoComp = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [currPlaceId, setPlaceId] = useState("ChIJAZ-GmmbMHkcR_NPqiCq-8HI");
  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${appKey}&place_id=${currPlaceId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const { lat, lng } = data.result.geometry.location;
        // console.log("Latitude:", lat);
        // console.log("Longitude:", lng);

        // console.log(data.result.address_components);
        const town = data.result.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("postal_town")
        )?.long_name;
        const postcode = data.result.address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;
        // console.log("Town:", town);
        // console.log("Postcode:", postcode);
      })
      .catch((error) => console.error(error));
  }, [selectedItem]);

  //   console.log(selectedItem);

  const handleSelectItem = (data) => {
    setSelectedItem(data);
    console.log(selectedItem);
  };

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(Object.keys(data));
        data ? handleSelectItem(data) : "";
        // handleSelectItem(data);
        // selectedItem.address_components
        //   ? ""
        //   : console.log("false", selectedItem.address_components);
      }}
      query={{
        key: `${appKey}`,
        language: "en",
      }}
    />
  );
};

// setCurrAddr(selectedItem.address_components)
