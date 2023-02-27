import {
  Text,
  Image,
  Linking,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Footer from "../Footer/Footer";
import { AutoComp } from "../../components/AutoComp";

export default function PetSingle({ route, extraData }) {
  const { pet } = route.params;
  console.log(extraData);
  const sendEmail = () => {
    Linking.openURL(`mailto:${pet.email}?subject=Regarding ${pet.pet_name}`);
  };

  // console.log(pet);
  return (
    <>
      <View style={styles.container}>
        <AutoComp />
        {/* <Text style={styles.title}>{pet.pet_name}</Text>
        <Image source={{ uri: pet.picture }} style={styles.image} />
        <Text style={styles.heading}>Hello! My name is {pet.pet_name}</Text>
        <Text style={styles.text}>My home is in {pet.description}.</Text>
        <Text style={styles.text}>
          I was last seen on {} around the {pet.location} area :(.
        </Text>
        <Text style={styles.text}>I really miss my owner {pet.your_name}.</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={sendEmail}>
          <Text style={styles.buttonText}>Contact owner</Text>
        </TouchableOpacity> */}
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5cc8d7",
  },
  title: {
    fontSize: 26,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
    fontWeight: "bold",
  },

  heading: {
    fontSize: 20,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
  },

  text: {
    fontSize: 20,
    alignContent: "center",
    paddingVertical: 10,
    alignSelf: "center",
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
    shadowColor: "black",
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
