import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer/Footer'
import Header from './Header'

function Help() {
  return (
    <>
        <Header/>
      
      <Container>
      <Head>
       <h1>
       Help & Support
       </h1> 
      <h4>Let's take a step ahead and help you better.</h4>
      </Head>
      <MainContent>
        <List>
        <li>Help With Orders</li>
        <li>General Issues</li>
        <li>Partner Onboarding</li>
        <li>Legal, Terms & Conditions</li>
        <li>FAQs</li>
        </List>
      </MainContent>
      </Container>
      <Footer/>
    </>
  )
}

export default Help

const List=styled.div`
width:20%;
height:100%;
background:rgb(237, 237, 235);
display:flex;
flex-direction:column;
li{
  font-size:16px;
  list-style-type:none;
  margin-left:20px;
  margin-top:30px;
  padding:10px;
}
`;
const Container=styled.div`
background:#37718e;
width:100%;
height:100%;
`;
const Head=styled.div`
h1{
  color:white;
  padding:50px 0px 0px 50px;
  margin:0px;
}
h4{
  color:white;
  font-weight:200;
  padding:0px 0px 20px 50px;
}
`;

const MainContent=styled.div`
background-color:white;
margin-left:50px;

width:100%;
height:500px;

`;