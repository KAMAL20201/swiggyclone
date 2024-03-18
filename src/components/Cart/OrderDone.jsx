import React from 'react';
import styled from 'styled-components';
import GreenTick from '../../assets/lotties/green-tick.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import classes from './style.module.css';

const ThankYouContainer = styled.div`
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const ThankYouTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const OrderStatus = styled.p`
  font-size: 18px;
  color: #666;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OrderDone = () => {
  return (
    <>
      <Container>
        <ThankYouContainer>
          <Lottie
            animationData={GreenTick}
            loop={true}
            autoplay={true}
            style={{ width: 100, height: 100 }}
          />
          <ThankYouTitle>Thank You for Ordering!</ThankYouTitle>
          <OrderStatus>Your order is on its way.</OrderStatus>
          <Link to="/user-details" className={classes.details}>
            View Details
          </Link>
        </ThankYouContainer>
      </Container>
    </>
  );
};

export default OrderDone;
