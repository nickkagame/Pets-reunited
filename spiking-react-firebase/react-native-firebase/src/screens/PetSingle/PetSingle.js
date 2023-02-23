import { Text, Image, Linking, Button, StyleSheet, View } from "react-native";

export default function PetSingle({ route, extraData }) {
  const { pet } = route.params;
console.log(extraData)
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
        <Text>My home is in {pet.description}.</Text>
        <Text>
          I was last seen on {} around the {pet.location} area :(
        </Text>
        <Text>I really miss my owner {pet.your_name}</Text>
        <Button
          style={styles.button}
          onPress={() => sendEmail()}
          title="Contact owner"
        />
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
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});
