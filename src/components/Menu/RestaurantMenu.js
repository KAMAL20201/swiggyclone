import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Shimmer from '../Shimmer/Shimmer';
import styled from 'styled-components';
import MenuHead from './MenuHead';
import MenuSubHead from './MenuSubHead';
import MainFoodMenu from './MainFoodMenu';
import { useLocationContext } from '../../contexts/locationModalContext';

function RestaurantMenu() {
  //to read the dynamic url
  const { resid } = useParams();
  const [RestauMenu, setRestaurantMenu] = useState({});
  const { latitude, longitude } = useLocationContext();

  //API call

  async function getRestaurantMenu() {
    const response = await fetch(
      `https://swiggyclone-backend-jy63.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${resid}&submitAction=ENTER`,
    );
    const json = await response.json();

    setRestaurantMenu(json?.data);
  }

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  //showing data
  return Object.keys(RestauMenu).length === 0 ? (
    <Shimmer />
  ) : (
    <Container>
      <MenuWrapper>
        <Menu>
          <MenuHead RestMenu={RestauMenu} />
          <MenuSubHead RestInfo={RestauMenu} />
          <MainFoodMenu MenuDetails={RestauMenu} />
        </Menu>
      </MenuWrapper>
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
    width: 94%;
  }
`;
