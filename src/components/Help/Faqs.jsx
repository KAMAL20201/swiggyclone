import React from 'react';
import styled from 'styled-components';
import OnboardList from './OnboardList';

function Faqs() {
  return (
    <Container>
      <ul>
        <li>
          <OnboardList
            heading="What is Swiggy Customer Care Number?"
            content="We value our customer’s time and hence moved away from a single customer care number to a comprehensive chat-based support system for quick and easy resolution. You no longer have to go through the maze of an IVRS call support. Just search for your issue in the help section on this page and initiate a chat with us. A customer care executive will be assigned to you shortly. You can also email us your issue on support@swiggy.in

Note: We value your privacy and your information is safe with us. Please do not reveal any personal information, bank account number, OTP etc. to another person. A Swiggy representative will never ask you for these details. Please do not reveal these details to fraudsters and imposters claiming to be calling on our behalf. Be vigilant and do not entertain phishing calls or emails. "
          />
        </li>

        <li>
          <OnboardList
            heading="I want to explore career opportunities with Swiggy"
            content="
                    Join our team
                    SEND AN EMAIL
                    We will revert within 24-48 hrs"
          />
        </li>
        <li>
          <OnboardList
            heading="I want to provide feedback"
            content="SEND AN EMAIL"
          />
        </li>
        <li>
          <OnboardList
            heading="Can I edit my order?"
            content="Your order can be edited before it reaches the restaurant. You could contact customer support team via chat or call to do so. Once order is placed and restaurant starts preparing your food, you may not edit its contents"
          />
        </li>
        <li>
          <OnboardList
            heading="I want to cancel my order"
            content="We will do our best to accommodate your request if the order is not placed to the restaurant (Customer service number:  080-67466729). Please note that we will have a right to charge a cancellation fee up to full order value to compensate our restaurant and delivery partners if your order has been confirmed."
          />
        </li>
      </ul>
    </Container>
  );
}

export default Faqs;

const Container = styled.div`
  height: auto;
  ul {
    list-style-type: none;
  }
`;
