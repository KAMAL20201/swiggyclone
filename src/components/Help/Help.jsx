import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Help() {
  return (
    <>
      <Container>
        <Head>
          <h1>Help & Support</h1>
          <h4>Let's take a step ahead and help you better.</h4>
        </Head>
        <MainContent>
          <List>
            <NavLink to="" end>
              <p>Partner Onboarding</p>
            </NavLink>
            <NavLink to="/help/legal">
              <p>Legal, Terms & Conditions</p>
            </NavLink>
            <NavLink to="/help/faqs">
              <p>FAQs</p>
            </NavLink>
          </List>
          <Content>
            <Outlet />
          </Content>
        </MainContent>
      </Container>
    </>
  );
}

export default Help;

const List = styled.div`
  width: 20%;
  margin: 0px 0px;
  background: rgb(237, 237, 235);
  display: flex;
  align-items: center;
  gap: 34px;
  flex-direction: column;
  @media (max-width: 600px) {
    width: 40%;
  }
  @media (max-width: 450px) {
    width: 30%;
  }
  a {
    font-size: 16px;
    list-style-type: none;
    min-height: 70px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    justify-content: center;
    align-items: center;
    width: 100%;
    p {
      padding: 0px 5px;
      text-align: center;
    }
    &.active {
      background: #fff;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
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
  min-height: 500px;
  display: flex;
  @media (max-width: 450px) {
    margin-left: 10px;
    width: 95%;
  }
`;
