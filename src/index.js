import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Offers from "./components/Header/Offers/Offers";
import Help from "./components/Header/Help"
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestaurantMenu from "./components/Menu/RestaurantMenu";
import NewOffers from "./components/Header/Offers/NewOffers";
const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    
  },
  {
    path: "/offers",
    element: <Offers />,
    
  },
  {
    path: "/help",
    element:<Help />
   
  },
  {
    path: "/restaurant/:resid",
    element:<RestaurantMenu/>
   
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <RouterProvider router={appRoutes}/>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
