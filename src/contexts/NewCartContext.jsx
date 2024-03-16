import { createContext, useContext, useState } from "react";

const NewCartContext = createContext();

export const NewCartContextWrapper = ({children}) => {
    const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
    const [continueWithAnotherCart, setContinueWithAnotherCart] = useState(false);

    return (
        <NewCartContext.Provider value={{
            isCartPopupOpen,
            setIsCartPopupOpen,
            continueWithAnotherCart,
            setContinueWithAnotherCart

        }}>
            {children}
        </NewCartContext.Provider>
    )
}

export const useNewCartContext = () => {
    return useContext(NewCartContext);
}
