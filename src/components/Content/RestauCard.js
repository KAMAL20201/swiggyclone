import React from "react";
import styled from "styled-components";
import {restaurantCardURL} from '../../config.js';
function RestauCard({  
    name,
    cuisines,
    cloudinaryImageId,
    avgRating,
    deliveryTime,
    costForTwoString,
    aggregatedDiscountInfo, }) {
  

      let ratingClass = '';

      if (avgRating < 3) {
        ratingClass = 'red';
      } else if (avgRating >= 3 && avgRating < 4) {
        ratingClass = '#fca00d';
      } else if (avgRating >= 4 && avgRating < 5) {
        ratingClass = 'green';
      } 
    
  return (
    <Card>
      <img
        alt="card"
        src={restaurantCardURL
           +
          cloudinaryImageId
        }
        height="150px"
      />
      <h3>{name}</h3>
      <h5>{cuisines?.join(", ")}</h5>
      <Foot>
        <MyH6 backgroundColor={ratingClass} >&#9733; {avgRating}</MyH6>
        <h6>&bull;</h6>
        <h6>{deliveryTime} mins</h6>
        <h6>&bull;</h6>
        <h6> {costForTwoString}</h6>
      </Foot>
      <Offers>
        <h5>
          {
            aggregatedDiscountInfo?.shortDescriptionList[0]
              ?.meta
          }
        </h5>
      </Offers>
    </Card>
  );
}

export default RestauCard;

const MyH6=styled.h6`


  color: ${props => props.backgroundColor};
`;
const Offers = styled.div`
  & h5 {
    opacity: 1 !important;
    color: #8a584b;
    margin-top: 2px;
  }
`;

const Foot = styled.div`
  display: flex;
  padding: 5px;
  border-bottom: 0.6px solid black;
  h6 {
    opacity: 0.5;
    margin-right: 15px;
  }
`;

const Card = styled.a`
  display: flex;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;
  flex-direction: column;
  margin-bottom: 50px;
  margin-top: 20px;
  width: 80% !important;
  padding: 20px;
  &:hover {
    box-shadow: 10px 10px 8px 2px rgba(0, 0, 0, 0.1);
  }
  a {
    text-decoration: none;
    color: black;
  }
  & h5 {
    opacity: 0.4;
    margin-top: 1px;
    margin-bottom: 6px;
  }
  h3 {
    margin-bottom: 1px;
  }

  img {
    width: 100%;
  }
`;
