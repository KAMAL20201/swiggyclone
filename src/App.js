import { useState, useEffect,useContext } from "react";

import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Shimmer from "./components/Shimmer/Shimmer";
import {  CardProvider,CardContext } from "./contexts/AddToCartConext";
import "./App.css";

function App() {
  const [inputData, setInputData] = useState("");
 
  const [restaurantdata, setRestaurantdata] = useState([]);



  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.742522447643577&lng=76.78731199007858&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setRestaurantdata(json?.data?.cards[2]?.data?.data?.cards);
    
  }

  const inputHandler = (data) => {
    setInputData(data);
  };

 
  return restaurantdata.length === 0 ? (
    <Shimmer />
  ) : (
      <CardProvider>
      <div className="App">
        <Header getInputData={inputHandler} />
        <Content  newRestaurantData={restaurantdata} newInputData={inputData} />,
        <Footer />
      </div>
      </CardProvider>
  
  );
}
export default App;
