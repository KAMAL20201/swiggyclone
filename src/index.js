import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Help from "./components/Help/Help";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestaurantMenu from "./components/Menu/RestaurantMenu";
import Cart from "./components/Cart/Cart";
import { Provider } from "react-redux";
import store from "./store";

import Error from "./components/Errors/Error";
import PartnerOnboard from "./components/Help/PartnerOnboard";
import Legals from "./components/Help/Legals";
import Faqs from "./components/Help/Faqs";
import OrderDone from "./components/Cart/OrderDone";
import { ModalProvider } from "./contexts/signInModalContext";
import { LocationProvider } from "./contexts/locationModalContext";
import SignUp from "./components/Modals/SignUp/SignUp";
import LocationModal, { LocationModalPortal } from "./components/Modals/LocationModal/LocationModal";


const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },

  {
    path: "/help",
    element: <Help />,
    children: [
      {
        index: true,
        element: <PartnerOnboard />,
      },
      {
        path: "legal",
        element: <Legals />,
      },
      {
        path: "faqs",
        element: <Faqs />,
      },
    ],
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/orderDone",
    element: <OrderDone />,
  },
  {
    path: "/restaurant/:resid",
    element: <RestaurantMenu />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <LocationProvider>
      <ModalProvider>
        <RouterProvider router={appRoutes}/>
       < SignUp/>
       <LocationModal/>

      </ModalProvider>
    </LocationProvider>
  </Provider>
);

reportWebVitals();

