import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({ props, pets, pet, coorQuerrt }) {
  const navigation = useNavigation();
  const goToSearch = () => {
    navigation.navigate("Search", {
      pets: pets,
      pet: pet,
    });
  };
  const goToUserProfile = () => {
    navigation.navigate("Profile", {
      pets: pets,
      pet: pet,
    });
  };

  const goToMapPage = () => {
    navigation.navigate("Map", {
      pets: pets,
      pet: pet,
      coorQuerrt: coorQuerrt,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToSearch()}
        >
          <Icon name="search" size={40} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToUserProfile()}
        >
          <Icon name="user-circle-o" size={40} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => goToMapPage()}
        >
          <Icon name="map-marker" size={40} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexend: 0,
    backgroundColor: "#5cc8d7",
  },
  footer: {
    backgroundColor: "orange",
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
