import React from "react";
import styled from "styled-components";
import OnboardList from "./OnboardList";
function PartnerOnboard() {
  return (
    <Container>
      <ul>
        <li>
          <OnboardList
            heading="I want to partner my restaurant with Swiggy"
            content="Partner with us SEND AN EMAIL We will revert within 24-48 hrs"
          />
        </li>

        <li>
          <OnboardList
            heading="What are the mandatory documents needed to list my restaurant on Swiggy?"
            content={
                <>
                    -  Copies of the below documents are mandatory <br />
                    -  FSSAI Licence OR FSSAI Acknowledgement <br />
                    -  Pan Card <br />
                    -  GSTIN Certificate <br />
                    -  Cancelled Cheque OR bank Passbook <br />
                    -  Menu
                </>
            }
          />
        </li>
        <li>
          <OnboardList
            heading="After I submit all documents, how long will it take for my restaurant
          to go live on Swiggy?"
            content="After all mandatory documents have been received and verified it takes upto 7-10 working days for the onboarding to be completed and make your restaurant live on the platform."
          />
        </li>
        <li>
          <OnboardList
           heading=
           "What is this one time Onboarding fees? Do I have to pay for it while registering?"
            content="This is a one-time fee charged towards the system & admin costs incurred during the onboarding process. It is deducted from the weekly payouts after you start receiving orders from Swiggy."
          />
        </li>
        <li>
          <OnboardList
           heading=
           "Who should I contact if I need help & support in getting onboarded?"
            content="You can connect with Partner Support on 080-67466777/68179777 or write to partnersuport@swiggy.in"
          />
        </li>
        <li>
          <OnboardList
           heading=
           "How much commission will I be charged by Swiggy?"
            content="The commission charges vary for different cities. You will be able to see the commission applicable for you once the preliminary onboarding details have been filled."
          />
        </li>
        <li>
          <OnboardList
           heading=
           "I don’t have an FSSAI licence for my restaurant. Can it still be onb"
            content="FSSAI licence is a mandatory requirement according to the government’s policies. However, if you are yet to receive the licence at the time of onboarding, you can proceed with the acknowledgement number which you will have received from FSSAI for your registration."
          />
        </li>
      </ul>
    </Container>
  );
}

export default PartnerOnboard;

const Container = styled.div`
    height:auto;
 ul{
   list-style-type: none;
 }
`