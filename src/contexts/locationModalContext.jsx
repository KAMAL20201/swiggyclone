import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { getLocationFromCookies } from '../utils/utils';

const LocationContext = createContext();
export const LocationProvider = ({ children }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [islocationModalVisible, setIslocationModalVisible] = useState(false);

  const openLocationModal = () => {
    setIslocationModalVisible(true);
  };

  const closeLocationModal = () => {
    setIslocationModalVisible(false);
  };

  const setLocation = (address) => {
    setCurrentLocation(address);
  };

  useEffect(() => {
    const userLocationValue = getLocationFromCookies();
    if (userLocationValue) {
      const { lat, lng, address } = userLocationValue;
      setLatitude(lat);
      setLongitude(lng);
      setLocation(address);
    } else {
      setLatitude('30.742522447643577');
      setLongitude('76.78731199007858');
      setLocation('Chandigarh, India');
    }
  }, [latitude, longitude]);

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
