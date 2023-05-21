import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 40px 0;
`;

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  display: flex;
`;

const Column = styled.div`
  flex: 1 0 15%;
  padding: 0 15px;
`;

const Heading = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const Bottom = styled.div`
  text-align: center;
  margin-top: 20px;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  background-color: #fff;
  color: #222;
  padding: 10px 15px;
  border-radius: 4px;
  margin-right: 10px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const ButtonText = styled.span`
  margin-left: 5px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Row>
          <Column>
            <Heading>COMPANY</Heading>
            <List>
              <ListItem>About Us</ListItem>
              <ListItem>About Swiggy</ListItem>
              <ListItem>Team</ListItem>
              <ListItem>Careers</ListItem>
              <ListItem>Swiggy Blog</ListItem>
              <ListItem>Bug Bounty</ListItem>
              <ListItem>Swiggy Super</ListItem>
              <ListItem>Swiggy Corporate</ListItem>
            </List>
          </Column>
          <Column>
            <Heading>CONTACT</Heading>
            <List>
              <ListItem>Help & Support</ListItem>
              <ListItem>Partner with us</ListItem>
              <ListItem>Ride with us</ListItem>
            </List>
          </Column>
          <Column>
            <Heading>LEGAL</Heading>
            <List>
              <ListItem>Terms & Conditions</ListItem>
              <ListItem>Refund & Cancellation</ListItem>
              <ListItem>Privacy Policy</ListItem>
              <ListItem>Cookie Policy</ListItem>
              <ListItem>Offer Terms</ListItem>
              <ListItem>Phishing & Fraud</ListItem>
            </List>
          </Column>
          <Column>
            <a href="https://play.google.com/store/apps/details?id=in.swiggy.android&hl=en&gl=US">
              <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl" />
            </a>
            <a href="https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920">
              <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv" />
            </a>
          </Column>
        </Row>
        <Bottom>
          <p>&copy; {new Date().getFullYear()} Swiggy. All rights reserved.</p>
        </Bottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
