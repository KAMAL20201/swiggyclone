import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const ThankYouContainer = styled.div`
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  margin: 10% auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const OrderDone = () => {
  return (
    <>
    <Header/>
    <ThankYouContainer>
      <ThankYouTitle>Thank You for Ordering!</ThankYouTitle>
      <OrderStatus>Your order is on its way.</OrderStatus>
    </ThankYouContainer>
    <Footer/>
    </>
  );
};

export default OrderDone;