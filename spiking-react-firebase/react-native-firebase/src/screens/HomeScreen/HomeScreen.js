import React, { useEffect } from "react";
import { Text, View, Button } from "react-native";
import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import { useNavigation } from '@react-navigation/native';



export default function HomeScreen({ props}) {
  const navigation = useNavigation();


  const onPostButtonPress = () => {
    navigation.navigate('PostPet');
  
  };


  return (
    <View>
      <Text>
        Home ScreenHome ScreenHome ScreenHome ScreenHome ScreenHome ScreenHome
        ScreenHome ScreenHome ScreenHome ScreenHome ScreenHome ScreenHome
        ScreenHome ScreenHome ScreenHome ScreenHome ScreenHome ScreenHome
        ScreenHome ScreenHome ScreenHome ScreenHome Screenv
      </Text>
      <Button title='PostPet' onPress={(onPostButtonPress)}/>
    </View>
  );
}

