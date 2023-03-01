const PetItem = ({ pet, pets, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(pet)}>
      <>
        <Text style={styles.petName}>{pet.pet_name}</Text>
        <Image
          source={{
            uri: pet.picture,
          }}
          style={styles.image}
        />
        <Text>{JSON.stringify(pets)}</Text>
      </>
    </TouchableOpacity>
  );
};
