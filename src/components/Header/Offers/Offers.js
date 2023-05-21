import React, { useEffect, useState } from "react";
import Header from "../Header";
import RestauCard from "../../Content/RestauCard";
import styled from "styled-components";
import Shimmer from "../../Shimmer/Shimmer";
import { createBrowserRouter, Link, Outlet } from "react-router-dom";
import NewOffers from "./NewOffers";
import MyCards from "./MyCards";
import Footer from "../../Footer/Footer";



function Offers() {
  const [OffersResturant, setOffersRestaurant] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [showCards,setShowCards]=useState(true);
  const [showOffers,setShowOffers]=useState(false);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
    if(buttonIndex===1){
      setShowCards(true);
      setShowOffers(false);
    }
    if(buttonIndex===2){
      setShowCards(false);
      setShowOffers(true);
    }

  };

  useEffect(() => {
    getOfferRestaurant();
  }, []);

  async function getOfferRestaurant() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/offers/restaurant?lat=30.7333148&lng=76.7794179&offset=0"
    );
    const json = await data.json();
    // console.log(json.data.cards);
    setOffersRestaurant(json?.data?.cards);
  }

  return OffersResturant.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <Header />
      <Banner>
        <BannerContent>
          <h1>Offers for you</h1>
          <h4>Explore top deals and offers exclusively for you!!</h4>
        </BannerContent>
        <img
          height="180px"
          alt=""
          src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/KHu24Gqw_md3ham"
        />
      </Banner>
      <ButttonComponent>
        <Link to="/offers">
          <Button
            active={activeButton === 1}
            onClick={() => handleButtonClick(1)}
          >
            Restaurant Offers
          </Button>
        
          <Button
            active={activeButton === 2}
            onClick={() => handleButtonClick(2)}
          >
            Payment offers/Coupons
          </Button>
          </Link>
       
      </ButttonComponent>
      {showCards && <MyCards offers={OffersResturant} />}
      {showOffers  && <NewOffers offers={OffersResturant} />}
      <Footer/>
    </div>
  );
}

export default Offers;

const Banner = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #005062;
  img {
    padding: 30px;
  }
`;

const BannerContent = styled.div`
  margin: 10px;
  padding: 20px;
  h1 {
    color: white;
    margin: 0px;
    font-size: 50px;
  }
  h4 {
    color: white;
    margin: 0px;
    opacity: 0.7;
    font-size: 20px;
    font-weight:500;
  }
`;

const ButttonComponent = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`;

const Button = styled.button`
  border: none;
  background-color: white;
  font-size: 20px;
  padding: 10px;
  margin: 20px 0px;
  opacity: ${(props) => (props.active ? "1" : "0.4")};
  font-weight: 600;
  cursor: pointer;
  &:first-child {
    margin-left: 45px;
  }
`;
