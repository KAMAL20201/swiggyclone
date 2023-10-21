import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

const LocationContext = createContext();
export const LocationProvider = ({ children }) => {
  const [latitude, setLatitude] = useState('30.742522447643577');
  const [longitude, setLongitude] = useState('76.78731199007858');
  const [currentLocation, setCurrentLocation] = useState("Chandigarh, India");
  const [islocationModalVisible, setIslocationModalVisible] = useState(false);

  const openLocationModal = () => {
    setIslocationModalVisible(true);
  };

  const closeLocationModal = () => {
    setIslocationModalVisible(false);
  };

  const setLocation = (cityname, state, country) => {
    setCurrentLocation(`${cityname}, ${state}, ${country}`);
    closeLocationModal();
  }

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        latitude,
        longitude,
        islocationModalVisible,
        setLatitude,
        setLongitude,
        setLocation,
        openLocationModal,
        closeLocationModal,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export function useLocationContext() {
  return useContext(LocationContext);
}
