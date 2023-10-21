import { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Shimmer from "./components/Shimmer/Shimmer";
import "./App.css";
import useGetRestaurants from "./components/myHooks/useGetRestaurants";
import { LocationProvider } from "./contexts/locationModalContext";
import { ModalProvider } from "./contexts/signInModalContext";


function App() {
  const [inputData, setInputData] = useState("");
  const restaurantdata = useGetRestaurants();

  const inputHandler = (data) => {
    setInputData(data);
  };

  return restaurantdata?.length === 0 ? (
    <Shimmer />
  ) : (
    
    <div className="App">
      <ModalProvider>
      <LocationProvider>
      <Header getInputData={inputHandler} />
      <Content newRestaurantData={restaurantdata} newInputData={inputData} />
      <Footer />
      </LocationProvider>
      </ModalProvider>
    </div>
  );
}
export default App;
