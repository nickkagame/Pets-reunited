import { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
// import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { appKey } from "./key";

export const AutoComp = () => {
  const [selectedItem, setSelectedItem] = useState("Warsaw");
  const [currAddr, setCurrAddr] = useState("ChIJAZ-GmmbMHkcR_NPqiCq-8HI");
  const [latCurrent, setLat] = useState(52.2296756);
  const [lngCurrent, setLng] = useState(21.0122287);
  // const addInp = !selectedItem ? "" : selectedItem.title;
  console.log(appKey);
  useEffect(() => {
    // axios
    //   .get(
    //     `https://maps.googleapis.com/maps/api/place/details/json?key=&place_id=${currAddr}`
    //   )
    //   .then(({ data }) => {
    //     console.log(data);
    //     const { lat, lng } = data.result.geometry.location;
    //     // console.log("Latitude:", lat);
    //     // console.log("Longitude:", lng);
    //     setLat(lat);
    //     setLng(lng);
    //   });

    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${appKey}&place_id=${currAddr}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const { lat, lng } = data.result.geometry.location;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        setLat(lat);
        setLng(lng);
        // console.log(data.result.address_components);
        const town = data.result.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("postal_town")
        )?.long_name;
        const postcode = data.result.address_components.find((component) =>
          component.types.includes("postal_code")
        )?.long_name;
        console.log("Town:", town);
        console.log("Postcode:", postcode);
      })
      .catch((error) => console.error(error));
  }, [selectedItem]);
  console.log(selectedItem);

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(Object.keys(data));
          setSelectedItem(data);
          selectedItem.address_components
            ? setCurrAddr(selectedItem.address_components)
            : "";
        }}
        query={{
          key: `${appKey}`,
          language: "en",
        }}
      />
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 52.2296756,
          longitude: 21.0122287,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        customMapStyle={mapStyle}
      >
        <Marker
          draggable
          coordinate={{
            latitude: latCurrent,
            longitude: lngCurrent,
          }}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={"Test Marker"}
          description={"This is a description of the marker"}
        />
      </MapView>
    </>
  );
};

const mapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  mapStyle: {
    marginTop: 500,
    marginBottom: 100,
    marginLeft: 50,
    marginRight: 50,
    flex: 1,
    // marginHorizontal: "20%",
    // marginTop: "2vh",

    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
