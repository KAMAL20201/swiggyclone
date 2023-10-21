import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";



function AddedToCart() {
  const cartItems = useSelector((state) => state.cart.cartItems);
   
    const totalAmount = cartItems.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.price;
      }, 0);
  return (
    <Container>
      <p>{cartItems.length} items | &#8377;{totalAmount/100.00}</p>
      <Link to='/cart'><p>View Cart</p></Link>
    </Container>
  )
}

export default AddedToCart

const Container = styled.div`
position:fixed;
left:0;
right:0;
bottom:0;
width:60%;
height:50px;
background-color:#60b246;
display:flex;
justify-content:space-between;
margin:auto;
@media (max-width:600px) {
  width: 70%;
}
@media (max-width:450px) {
  width: 90%;
}
p{
    padding: 0px 20px;
    color:white;
}
a{
    text-decoration:none;
}
`