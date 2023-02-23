import { Text } from "react-native";

export default function PetSingle({ route }) {
  const { name } = route.params;
  console.log(name);
  return <Text>hello single pet {name} </Text>;
}
