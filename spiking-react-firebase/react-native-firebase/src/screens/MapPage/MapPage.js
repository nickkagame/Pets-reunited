import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { db } from "../HomeScreen/HomeScreen";
import { useState, useEffect } from "react";

export const MapPage = ({ route }) => {
  const { pet, pets, coorQuerrt } = route.params;
  const [petsData, setPetsData] = useState([]);

  const getPets = async () => {
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      newPets.push(pet);
    });
    setPetsData(newPets);
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={{
        latitude: pet
          ? pet.coordinates.lat
          : coorQuerrt
          ? coorQuerrt.latitude
          : 53.483959,
        longitude: pet
          ? pet.coordinates.lng
          : coorQuerrt
          ? coorQuerrt.longitude
          : -2.244644,
        latitudeDelta: 1.05,
        longitudeDelta: 0.05,
      }}
    >
      {pets.map((pet) => (
        <Marker
          key={pet.id}
          coordinate={{
            latitude: pet.coordinates.lat,
            longitude: pet.coordinates.lng,
          }}
          title={pet.pet_name}
          description={`a ${pet.pet_type} missing`}
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
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
