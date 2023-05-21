import React from "react";
import styled from "styled-components";
import { restaurantCardURL } from "../../../config";
function OffersCard({ type, data }) {
  return (
    <>
      <Card>
        
          {data?.logo && (
            <Head>
              <img alt="" height="18px" src={restaurantCardURL + data?.logo} />
              <p>{data?.couponCode}</p>
             </Head>
          )}
       
        <Body>
          {data?.title && <p>{data?.title}</p>}
          {data?.description && <p>{data?.description}</p>}
        </Body>
        <Copy></Copy>
      </Card>
    </>
  );
}

export default OffersCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 28%;
  border: 1px solid black;
  margin: 15px;
  border-radius: 10px;
  padding: 15px;
`;

const Head = styled.div`
  background-color: #fffae6;
  height: 28px;
  width:50%;
  font-size:15px;
  display: flex;
 
  img{
    padding:5px 5px;
  }
  p{
    padding:7px 5px;
    margin:0px;
    font-weight:550;
    letter-spacing: 0.1em;

  }

 
`;
const Body = styled.div`
p:first-child{
  font-weight:500;
  margin-bottom:15px;
  letter-spacing: 0.04em;
}
p:nth-child(2){
  font-size:12px;
  font-weight:100;
  opacity:0.7;
  margin-top:5px;
  letter-spacing: 0.08em;
}
`;
const Copy = styled.div``;
