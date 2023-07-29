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
      <RestaurantHead>
      <h3>{name}</h3>
      <h5>{cuisines?.join(", ")}</h5>
      <Foot>
        <MyH6 backgroundColor={ratingClass} >&#9733; {avgRating}</MyH6>
        <h6>&bull;</h6>
        <h6>{deliveryTime} mins</h6>
        <h6>&bull;</h6>
        <h6> {costForTwoString}</h6>
      </Foot>
      </RestaurantHead>
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


const RestaurantHead=styled.div`
display:flex;
flex-direction:column;
@media (max-width: 450px) {
  width:80%;
  margin:0px 10px;
}
`
const MyH6=styled.h6`
  color: ${props => props.backgroundColor};
`;

const Offers = styled.div`
  & h5 {
    opacity: 1 !important;
    color: #8a584b;
    margin-top: 2px;
  }
  @media (max-width: 450px) {
    display: none;
  }
`;

const Foot = styled.div`
  display: flex;
  padding: 0.5rem;
  border-bottom: 0.6px solid black;
  @media (max-width: 600px) {
    display:none;
  }
  @media (max-width: 450px) {
    display: flex;
    border:none;
    padding:1px;
  }
  h6 {
    opacity: 0.5;
    margin-right: 1vw;
    font-size: 10px;
    @media (max-width: 450px) {
    margin:2px 2px;
    font-size:1.2vmax;
    
    
  }
    
  }
`;

const Card = styled.div`
  display: flex;
  border-radius: 10px;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;
  flex-direction: column;
  margin-bottom: 50px;
  width: 80% !important;
  padding: 10px 15px;
  @media (max-width: 600px) {
    height:auto;
    margin-bottom:10px;
  }
  @media (max-width: 450px) {
    display: flex;
    flex-direction: row;
    margin-bottom:20px;
    
  }
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
    font-size:14px;
    @media (max-width: 600px) {
      font-size:1.8vmax;
    }
    @media (max-width: 450px) {
       font-size:1.4vmax;
       margin-bottom:1px;
    }
  }
  h3 {
    font-size:15px;
    margin-bottom: 10px;
    @media (max-width: 600px) {
      font-size:2.3vmax;
    }
    @media (max-width: 450px) {
       font-size:2vmax;
       margin-bottom:1px;
    }
  }

  img {
    width: 16vmax;
    height: 16vmax;
    object-fit: contain;
    @media (max-width: 450px) {
      border-radius: 32px 32px 32px 32px / 22px 22px 22px 22px;
    }
  }
`;
