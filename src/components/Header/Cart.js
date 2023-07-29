import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Header from "./Header";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

function Cart() {
  const [isanimationVisible, setIsAnimationVisible] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsAnimationVisible(true);
  };

  const totalAmount = cartItems.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.totalPrice;
  }, 0);

  const removeItemHandler = (cartItem) => {
    dispatch(cartActions.removeFromCart(cartItem.id));
  };
  const addItemHandler = (cartItem) => {
    dispatch(
      cartActions.addToCart({
        id: cartItem.id,
        price: cartItem.price,
        name: cartItem.name,
        description: cartItem.description,
      })
    );
  };
  return (
    <>
      <Header />
      <Container>
        <CartItems>
          {cartItems.length === 0 ? (
            <>
              <img
                alt=""
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              />
              <h3>Your Cart is empty</h3>
              <h6>You can go to home page to view more restaurants</h6>
            </>
          ) : (
            cartItems.map((cartItem) => (
              <Item>
                <p> {cartItem.name}</p>
                <Amount>
                  <button onClick={() => removeItemHandler(cartItem)}>-</button>
                  <h4>{cartItem.quantity}</h4>
                  <button onClick={() => addItemHandler(cartItem)}>+</button>
                </Amount>
                <p> &#x20B9; {cartItem.totalPrice / 100.0}</p>
              </Item>
            ))
          )}

          {cartItems.length > 0 && (
            <Button onClick={handleClick}>
              ORDER NOW &#x20B9;{totalAmount / 100.0}
            </Button>
          )}
        </CartItems>
      </Container>
      <Footer />
    </>
  );
}

export default Cart;

const scooterMove = keyframes`
    0% {
      left: -40%; /* Initial left position */
    }
    100% {
      left: calc(40%); /* Final right position */
    }
  `;

const ScooterImage = styled.img`
  position: relative;
  left: -40%; /* Initial left position of the scooter */
  animation-name: ${scooterMove};
  animation-duration: 3s; /* Duration of the animation */
  animation-timing-function: linear; /* Linear animation */
  animation-fill-mode: forwards; /* Keep the final position after animation ends */
`;
const Amount = styled.div`
  display: flex;
  align-items: center;
  h4 {
    margin: 0px;
    padding: 0px 5px;
  }
  margin-right: 10px;
  justify-content: space-between;
`;
const Button = styled.button`
  display: flex;
  width: 50%;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;
  background-color: rgb(96, 178, 70);
  color: white;
  border: none;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7% 10%;
  justify-content: center;

  img {
    height: 250px;
    width: 38%;
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p:first-child {
    margin-left: 12%;
    flex: 1; //Ensures equal width for first p tag
  }

  > * {
    flex-shrink: 0;
  }

  > *:not(:first-child) {
    margin-left: 10px;
  }
`;
