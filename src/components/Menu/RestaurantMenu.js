import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";

import Shimmer from "../Shimmer/Shimmer";
import styled from "styled-components";
import useRestauMenu from "../../myHooks/useRestauMenu";
import MenuHead from "./MenuHead";
import MenuSubHead from "./MenuSubHead";
import MainFoodMenu from "./MainFoodMenu";

function RestaurantMenu() {
  //to read the dynamic url
  const { resid } = useParams();

  //fetching data
  const RestauMenu = useRestauMenu(resid);

  //showing data
  return Object.keys(RestauMenu).length === 0 ? (
    <Shimmer />
  ) : (
    <Container>
      <Header />
      <MenuWrapper>
        <Menu>
          <MenuHead RestMenu={RestauMenu} />
          <MenuSubHead RestInfo={RestauMenu} />
          <MainFoodMenu MenuDetails={RestauMenu} />
        </Menu>
      </MenuWrapper>
      <Footer />
    </Container>
  );
}

export default RestaurantMenu;

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;

  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;
