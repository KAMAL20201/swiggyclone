import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Offers from "./components/Header/Offers/Offers";
import Help from "./components/Header/Help";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestaurantMenu from "./components/Menu/RestaurantMenu";
import SignIn from "./components/Header/SignIn";
import Cart from "./components/Header/Cart";
import { Provider } from "react-redux";
import store from "./store";
import SignUp from "./components/Header/SignUp";
import Error from "./components/Errors/Error";
import Forgot from "./components/Header/Forgot";
import SignInLayout from "./components/Header/SignInLayout";
import NewPassword from "./components/Header/NewPassword";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error/>
  },
  {
    path: "/offers",
    element: <Offers />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignInLayout/>,
    children:[
      {
        index:true,
        element:<SignIn/>
      },
      {
        path:"forgot",
        element:<Forgot/>,
      },
      {
        path:"reset",
        element:<NewPassword/>
      }
    ]

  },
  
  {
    path: "/help",
    element: <Help />,
    children:[
      {
      path:"orders",
      }
    ]
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/restaurant/:resid",
    element: <RestaurantMenu />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={appRoutes} />
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
