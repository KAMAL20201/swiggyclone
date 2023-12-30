import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../client';

const UserContext = createContext({});

export const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: null,
    email: null,
  });
  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
      } else {
        const { email, id, user_metadata } = data?.session?.user || {};
        const { full_name } = user_metadata || {};
        setUser({ id, name: full_name, email });
      }
    };
    fetchUserDetails();
  }, []);

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
