import React, { createContext, useState } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [currentCardInfo, setCurrentCardInfo] = useState([{name:'',price:0}]);

  const updateCardInfo = (name, price) => {
    setCurrentCardInfo([...currentCardInfo,{ name: name, price: price }]);
  };
  return (
    <CardContext.Provider value={{ currentCardInfo, updateCardInfo }}>
      {children}
    </CardContext.Provider>
  );
};
