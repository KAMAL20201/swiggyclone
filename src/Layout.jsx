import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/react';

const Layout = ({ children }) => {

  return (
    <>
      <Header />
      <main style={{ minHeight: '70vh' }}>
        <Toaster />
        <SpeedInsights />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
