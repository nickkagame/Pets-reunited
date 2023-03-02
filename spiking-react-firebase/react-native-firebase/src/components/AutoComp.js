import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { appKey } from "./key";

export const AutoComp = ({
  setLocation,
  setPostcode,
  setTown,
  setCoordinates,
}) => {
  const handleSelectItem = (data) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?key=${appKey}&place_id=${data.place_id}`
    ).then((response) => {
      response.json().then((responseData) => {
        const { lat, lng } = responseData.result.geometry.location;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        setCoordinates(responseData.result.geometry.location);

        const town = responseData.result.address_components.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("postal_town")
        )?.long_name;
        const postcode = responseData.result.address_components.find(
          (component) => component.types.includes("postal_code")
        )?.long_name;
        setTown(town);
        if (postcode) {
          setPostcode(postcode);
        }
      });
    });
  };

  return (
    <GooglePlacesAutocomplete
      placeholder="Enter location where the pet was lost"
      onPress={(data, details = null) => {
        setLocation(data.description);
        handleSelectItem(data);
      }}
      query={{
        key: `${appKey}`,
        language: "en",
      }}
    />
  );
};
