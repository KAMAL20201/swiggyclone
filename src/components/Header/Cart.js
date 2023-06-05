import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
function Cart() {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

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
                  <button onClick={()=>removeItemHandler(cartItem)}>-</button>
                  <h4>{cartItem.quantity}</h4>
                  <button onClick={()=>addItemHandler(cartItem)}>+</button>
                </Amount>
                <p> &#x20B9; {cartItem.totalPrice / 100.0}</p>
              </Item>
            ))
          )}
          {cartItems.length>0 && <Button>ORDER NOW &#x20B9;{totalAmount/100.00}</Button>}
        </CartItems>
      </Container>
      <Footer />
    </>
  );
}

export default Cart;

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
    flex: 0.9; //Ensures equal width for first p tag
  }
  &:nth-child(2) {
  }
  &:nth-child(3) {
    margin-right: 100px;
  }
`;
