import {
  Text,
  Image,
  Linking,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../Footer/Footer";

export default function PetSingle({ route, extraData }) {
  const { pet, pets } = route.params;
  // console.log(pet);
  // console.log(route.params.pets);
  const sendEmail = () => {
    Linking.openURL(
      `mailto:${pet.email}?subject=Regarding ${pet.pet_name}`
    ).catch((err) => {
      console.log(err);
      alert("Local email application not setup!");
      return;
    });
  };
  const dateString = pet.lastSeenDate.split(" ").slice(0, 4).join(" ");

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{pet.pet_name}</Text>
        <Image source={{ uri: pet.picture }} style={styles.image} />
        <View style={styles.petDetailsContainer}>
          <Text style={styles.petDetails}>
            Hello! My name is {pet.pet_name}. I was last seen on {dateString}.
            My last known location was {pet.location} :(. I really miss my owner{" "}
            {pet.your_name}.
          </Text>
          <Text style={styles.petDetails}>More details : {pet.description}.</Text>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={sendEmail}>
          <Text style={styles.buttonText}>Contact owner</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer pet={pet} pets={pets} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cff7fc",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    fontWeight: "bold",
    textShadowColor: "#4769fc",
    textShadowRadius: 10,
    
  },
  petDetailsContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
    paddingVertical: 12,
  },
  petDetails: {
    fontSize: 20,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    fontSize:18,
    lineHeight: 24,
  },

  text: {
    fontSize: 20,
    alignContent: "center",
    paddingVertical: 10,
    alignSelf: "center",
    lineHeight: 2,
    fontSize:18
  },

  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    margin: 30,
    borderRadius: 30,
  },

  buttonContainer: {
    marginBottom: 36,
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
    shadowColor: "#0d2175",
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
