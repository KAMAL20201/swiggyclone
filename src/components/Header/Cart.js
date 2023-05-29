import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { useContext, useState, useEffect } from "react";
import { CardContext } from "../../contexts/AddToCartConext";
function Cart() {
  const { currentCardInfo, updateCardInfo } = useContext(CardContext);
  const totalAmount = currentCardInfo.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.price;
  }, 0);

  return (
    <>
      <Header />
      <Container>
        <CartItems>
          {currentCardInfo.length === 1 ? (
            <>
              <img
                alt=""
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              />
              <h3>Your Cart is empty</h3>
              <h6>You can go to home page to view more restaurants</h6>
            </>
          ) : (
            currentCardInfo.map(
              (cartItem, index) =>
                index > 0  && (
                  <Item>
                    <p> {cartItem.name}</p>

                    <p> &#x20B9; {cartItem.price / 100.0}</p>
                  </Item>
                )
            )
          )}
          <Button>Order Now &#x20B9;{totalAmount/100.00}</Button>
        </CartItems>
      </Container>
    </>
  );
}

export default Cart;

const Button = styled.button`
display:flex;
width:10%;
height:50px;
justify-content:center;
align-items:center;
margin:auto;
margin-top:20px;

`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7% 5%;
  img {
    height: 50%;
    width: 80%;
    margin: auto;
    padding: 20px;
  }
  h3,
  h6 {
    margin: auto;
    padding: 10px;
  }
  h6 {
    color: rgba(0, 0, 0, 0.3);
  }
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
`;
