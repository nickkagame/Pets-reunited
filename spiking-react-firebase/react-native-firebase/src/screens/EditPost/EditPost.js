import { ScrollView, StyleSheet, View, Text, Image, Button } from "react-native";

export default function EditPost({route, extraData }) {
    const {pet} = route.params;
    



  return (
    <>
    <View style={styles.container} key={pet.id}>
      <Text style={styles.title}>
        Hello! My name is {pet.pet_name} the {pet.pet_type}
      </Text>
      <Image
        source={{ uri: pet.picture }}
        style={{ width: 200, height: 200 }}
      />
      <Text>My home is in {pet.description}.</Text>
      <Text>
        I was last seen on {} around the {pet.location} area :
      </Text>
      <Text>I really miss my owner {pet.your_name}</Text>
      <Button title="string"
      />
    </View>
  </>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ecf0f1",
    },
    content: {
      flex: 1,
    },
    footer: {
      backgroundColor: "yellow",
      padding: 40,
    },
  });