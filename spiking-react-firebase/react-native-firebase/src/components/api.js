import firebase from "firebase/compat";
import { getStorage } from "firebase/storage";

const db = firebase.firestore();

export const getPets = async () => {
  const storage = getStorage();
  const queryPets = await db.collection("lost_pets").get();
  const newPets = [];
  const newURL = [];
  queryPets.forEach((doc) => {
    const pet = { ...doc.data(), id: doc.id };
    newPets.push(pet);
    newURL.push(pet.picture);
  });
  return newPets;
};
