import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { db } from "../HomeScreen/HomeScreen";
import { collection } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { useState, useEffect } from "react";

export const MapPage = ({ route }) => {
  const { pet, pets } = route.params;
  const [petsData, setPetsData] = useState([]);
  const markersTest = [
    { name: "London", lat: 51.509865, lon: -0.118092 },
    { name: "Manchester", lat: 53.483959, lon: -2.244644 },
    { name: "Manchester2", lat: 53.483999, lon: -2.241644 },
    { name: "Middlewich", lat: 53.194087, lon: -2.44413 },
    { name: "Birmingham", lat: 52.489471, lon: -1.898575 },
    { name: "Chester", lat: 53.189999, lon: -2.89 },
  ];
  console.log(pet);
  const getPets = async () => {
    const storage = getStorage();
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    // const newURL = [];
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      newPets.push(pet);
      // newURL.push(pet.picture);
    });
    // console.log(newPets[8]);
    setPetsData(newPets);
    // console.log(petsData);
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={{
        latitude: 53.483959,
        longitude: -2.244644,
        latitudeDelta: 3.05,
        longitudeDelta: 0.05,
      }}
    >
      {/* <Marker
        draggable
        coordinate={{
          latitude: 53.483959,
          longitude: -2.244644,
        }}
        onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
        title={"Test Marker"}
        description={"This is a description of the marker"}
      /> */}
      {markersTest.map((marker) => (
        <Marker
          key={marker.name}
          coordinate={{ latitude: marker.lat, longitude: marker.lon }}
          title={marker.name}
          description={
            "a lost pet placeholder, here we can render some description. Or maybe we want to go to the PetSingle screen on click?"
          }
          //   onPress={() => handlePressMarker(marker)}
        />
      ))}
    </MapView>
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
    // marginTop: 0,
    // marginBottom: 100,
    // marginLeft: 50,
    // marginRight: 50,
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
