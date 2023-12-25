import { createContext, useContext, useState } from 'react';

const RestaurantsContext = createContext({});

export const RestaurantsContextWrapper = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export function useRestaurantsContext() {
  return useContext(RestaurantsContext);
}
