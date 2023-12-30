import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
const Layout = ({ children }) => {

  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
