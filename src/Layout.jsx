import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useUserContext } from './contexts/userContext';
import { supabase } from './client';

const Layout = ({ children }) => {

  const { setUser } = useUserContext();
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
  }, [setUser]);
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
