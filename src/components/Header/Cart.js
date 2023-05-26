import React from 'react'
import styled from 'styled-components'
import Header from './Header'
function Cart() {
  return (
    <>
    <Header/>
    <Container>
        <Head>
        <img alt="" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"/>
        <h3>Your Cart is empty</h3>
        <h6>You can go to home page to view more restaurants</h6>
        </Head>




    </Container>
    </>
      
    
  )
}

export default Cart

const Container=styled.div`

display:flex;
flex-direction:column;
`;
const Head=styled.div`
display:flex;
flex-direction:column;
margin:7% 37%;
img{
    height:50%;
    width:80%;
    margin:auto;
    padding:20px;
}
h3,h6{
margin:auto;
padding:10px;
}
h6{
    color:rgba(0,0,0,0.3);
}
`;