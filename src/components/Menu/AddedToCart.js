import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { CardContext } from '../../contexts/AddToCartConext'
import { Link } from 'react-router-dom'


function AddedToCart() {

    const {currentCardInfo,updateCardInfo}=useContext(CardContext);
    const totalAmount = currentCardInfo.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.price;
      }, 0);
  return (
    <Container>
      <p>{currentCardInfo.length-1} items | &#8377;{totalAmount/100.00}</p>
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
p{
    padding: 0px 20px;
    color:white;
}
a{
    text-decoration:none;
}
`