import { createContext, useContext, useState } from 'react';

const UserContext = createContext({});

export const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: null,
    email: null,
  });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
