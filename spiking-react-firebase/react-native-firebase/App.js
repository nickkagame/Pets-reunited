import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, HomeScreen, RegistrationScreen } from "./src/screens";
import { firebase } from "./src/firebase/config"; //
import { decode, encode } from "base-64";
import { Text } from "react-native"; //
import PostPet from "./src/screens/PostPet/PostPet.js";
import PetSingle from "./src/screens/PetSingle/PetSingle";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Search from "./src/screens/Search/Search";
import UserProfile from "./src/screens/UserProfile/UserProfile";
import EditProfile from "./src/screens/EditProfile/EditProfile";
import EditPost from "./src/screens/EditPost/EditPost";
import { MapPage } from "./src/screens/MapPage/MapPage";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(null);
  const [user, setUser] = useState(null);
  console.log(user, "<____");
  if (loading) {
    return <Text>loading ...</Text>;
  }
  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer style={styles.navContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="PostPet">
              {(props) => <PostPet {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="PetSingle">
              {(props) => <PetSingle {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Search">
              {(props) => <Search {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="UserProfile">
              {(props) => <UserProfile {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="EditProfile">
              {(props) => (
                <EditProfile {...props} extraData={user} setUser={setUser} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Edit Post">
              {(props) => (
                <EditPost {...props} extraData={user} setUser={setUser} />
              )}
            </Stack.Screen>
            <Stack.Screen name="MapPage">
              {(props) => (
                <MapPage {...props} extraData={user} setUser={setUser} />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "black",
  },
});
