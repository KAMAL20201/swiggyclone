import React, { createContext, useContext, useState } from 'react';

const SignInModalContext = createContext();

export function SignInModalProvider({ children }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SignInModalContext.Provider
      value={{ isModalVisible, openModal, closeModal }}
    >
      {children}
    </SignInModalContext.Provider>
  );
}

export function useModal() {
  return useContext(SignInModalContext);
}
