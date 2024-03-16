import { createContext, useContext, useState } from 'react';

const SearchRestaurantContext = createContext({});

export const SearchRestaurantWrapper = ({ children }) => {
  const [query, setQuery] = useState('');
  return (
    <SearchRestaurantContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </SearchRestaurantContext.Provider>
  );
};

export const useSearchRestaurantContext = () => {
  return useContext(SearchRestaurantContext);
};
