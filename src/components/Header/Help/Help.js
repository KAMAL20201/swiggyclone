import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../Footer/Footer";
import Header from "../Header";

function Help() {
  return (
    <>
      <Header />

      <Container>
        <Head>
          <h1>Help & Support</h1>
          <h4>Let's take a step ahead and help you better.</h4>
        </Head>
        <MainContent>
          <List>
            <NavLink to="" end>
              Partner Onboarding
            </NavLink>
            <NavLink to="/help/legal">Legal, Terms & Conditions</NavLink>
            <NavLink to="/help/faqs">FAQs</NavLink>
          </List>
          <Content>
            <Outlet />
          </Content>
        </MainContent>
      </Container>
      <Footer/>
    </>
  );
}

export default Help;

const List = styled.div`
  width: 20%;
  margin: 0px 0px;

  background: rgb(237, 237, 235);
  display: flex;
  flex-direction: column;
  a {
    font-size: 16px;
    list-style-type: none;
    text-decoration: none;
    color:black;
    margin-left: 20px;
    margin-top: 30px;
    padding: 10px;
    &.active{
     color: #fc8019
    }
  }
  
`;

const Content = styled.div`
  width:100%;
  height:100%;
`;

const Container = styled.div`
  background: #37718e;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
`;
const Head = styled.div`
  h1 {
    color: white;
    padding: 50px 0px 0px 50px;
    margin: 0px;
  }
  h4 {
    color: white;
    font-weight: 200;
    padding: 0px 0px 20px 50px;
  }
`;

const MainContent = styled.div`
  background-color: white;
  margin-left: 50px;
  width: 90%;
  height: 100%;
  display:flex;
`;