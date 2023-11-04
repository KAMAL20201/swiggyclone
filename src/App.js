import { useState } from "react";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Shimmer from "./components/Shimmer/Shimmer";
import "./App.css";
import useGetRestaurants from "./myHooks/useGetRestaurants";
import UnServiceAble from "./components/UnServiceAble/UnServiceAble";

function App() {
  const [inputData, setInputData] = useState("");
  const restaurantdata = useGetRestaurants();

  const inputHandler = (data) => {
    setInputData(data);
  };

  if (Array.isArray(restaurantdata)) {
    return restaurantdata?.length === 0 ? (
      <Shimmer />
    ) : (
      <div className="App">
        <Header getInputData={inputHandler} />
        <Content newRestaurantData={restaurantdata} newInputData={inputData} />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header getInputData={inputHandler} />
        <UnServiceAble/>
        <Footer />
      </div>
    );
  }
}
export default App;
