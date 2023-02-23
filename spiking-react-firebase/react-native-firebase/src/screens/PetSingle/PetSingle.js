import { Text, Image, Linking, Button, StyleSheet } from "react-native";

export default function PetSingle({ route }) {
  const { pet } = route.params;

  const sendEmail = () => {
    Linking.openURL(`mailto:${pet.email}?subject=Regarding ${pet.pet_name}`);
  };

  //   console.log(pet);
  return (
    <>
      <Text style={styles.textSinglePet}>
        Hello! My name is {pet.pet_name} the {pet.pet_type}
      </Text>
      <Image
        source={{ uri: pet.picture }}
        style={{ width: 200, height: 200 }}
      />
      <Text>My home is in {pet.description}.</Text>
      <Text>
        I was last seen on {pet.lastSeenDate} around the {pet.location} area :(
      </Text>
      <Text>I really miss my owner {pet.your_name}</Text>
      <Button
        style={styles.button}
        onPress={() => sendEmail()}
        title="Contact owner"
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  textSinglePet: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
});
