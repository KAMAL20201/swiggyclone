import React from 'react'
import styled from 'styled-components';
function ShimmerCards() {
  return (
    <>
      <Container>
        <Main/>
        <FirstLine/>
        <SecondLine/>
      </Container>
    </>
  )
}

export default ShimmerCards

const Container=styled.div`
margin:55px 20px 30px 70px;
border-radius: 10px;
display:flex;
width:17%;
height:220px;
flex-direction:column;
justify-content:space-between;

`;
const Main=styled.div`
background-color:rgba(40,44,63,.05);
width:100%;
height:145px;
margin-bottom:3px;
`;
const FirstLine=styled.div`
background-color:rgba(40,44,63,.05);
height:10px;
width:50%;
margin-bottom: 2px;
`;
const SecondLine=styled.div`
background-color:rgba(40,44,63,.05);
height:10px;
width:35%;

`;