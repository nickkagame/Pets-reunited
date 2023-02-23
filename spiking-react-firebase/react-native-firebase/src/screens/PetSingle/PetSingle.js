import {
  Text,
  Image,
  Linking,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

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
        <Text style={styles.title}>
          Hello! My name is {pet.pet_name} the {pet.pet_type}
        </Text>
        <Image
          source={{ uri: pet.picture }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={styles.text}>My home is in {pet.description}.</Text>
        <Text style={styles.text}>
          I was last seen on {} around the {pet.location} area :(.
        </Text>
        <Text style={styles.text}>I really miss my owner {pet.your_name}.</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={sendEmail}>
          <Text style={styles.buttonText}>Contact owner</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 22,
    color: "#000",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
  },
  text: {
    alignContent: "center",
    paddingVertical: 12,
    alignSelf: "center",
  },
  buttonContainer: {
    marginBottom: 36,
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 16,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
