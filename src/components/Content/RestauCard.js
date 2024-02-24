import React from 'react';
import styled from 'styled-components';
import { restaurantCardURL } from '../../utils/utils';
function RestauCard({
  name,
  cuisines,
  cloudinaryImageId,
  avgRating,
  sla,
  costForTwo,
  aggregatedDiscountInfoV2,
}) {
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
        src={restaurantCardURL + cloudinaryImageId}
        height="150px"
        loading="lazy"
      />

      <ContentWrapper>
        <RestaurantHead>
          <h3>{name}</h3>
          <Cuisines>{cuisines?.join(', ')}</Cuisines>
          <Foot>
            <MyH6 backgroundColor={ratingClass}>&#9733; {avgRating}</MyH6>
            <h6>&bull;</h6>
            <h6>{sla?.deliveryTime} mins</h6>
            <h6>&bull;</h6>
            <h6> {costForTwo}</h6>
          </Foot>
        </RestaurantHead>

        {aggregatedDiscountInfoV2?.descriptionList && (
          <Offers>
            <span>{aggregatedDiscountInfoV2?.descriptionList[0]?.meta}</span>
          </Offers>
        )}
      </ContentWrapper>
    </Card>
  );
}

export default RestauCard;

const ContentWrapper = styled.div`
  @media (max-width: 450px) {
    width: 100%;
    margin: 0px 10px;
  }
`;
const RestaurantHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  @media (max-width: 450px) {
    width: 80%;
    margin: 0px 10px;
  }
`;
const MyH6 = styled.h6`
  margin: 0px;
  color: ${(props) => props.backgroundColor};
`;

const Offers = styled.div`
  padding: 5px 0px;
  @media (max-width: 450px) {
  }
  & span {
    display: flex;
    width: 100%;
    opacity: 1 !important;
    color: #8a584b;
    margin-top: 2px;
    text-align: justify;
    font-size: 12px;
    @media (max-width: 600px) {
      font-size: 10px;
    }
    @media (max-width: 450px) {
      font-size: 10px;
      color: #8a584b;
      padding: 5px;
    }
  }
`;

const Cuisines = styled.h5`
  opacity: 0.4;
  margin-top: 1px;
  margin-bottom: 6px;
  font-size: 14px;
  @media (max-width: 720px) {
    font-size: 1.8vmax;
  }
  @media (max-width: 600px) {
    display: none;
  }
`;
const Foot = styled.div`
  display: flex;
  padding: 0.5rem 0px;
  border-bottom: 0.6px solid black;

  @media (max-width: 450px) {
    display: flex;
    border: none;
  }
  h6 {
    opacity: 0.5;

    margin: 0px 1vw 10px 0px;
    font-size: 10px;
    @media (max-width: 450px) {
      margin: 2px 2px;
      font-size: 10px;
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
  width: 80%;

  padding: 10px 15px;
  @media (max-width: 600px) {
    height: auto;
    margin-bottom: 10px;
  }
  @media (max-width: 450px) {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    width: 100%;
  }
  &:hover {
    box-shadow: 10px 10px 8px 2px rgba(0, 0, 0, 0.1);
  }
  a {
    text-decoration: none;
    color: black;
  }
  h3 {
    font-size: 15px;
    margin-bottom: 10px;
    @media (max-width: 600px) {
      font-size: 12px;
    }
    @media (max-width: 450px) {
      font-size: 10px;
      margin-bottom: 1px;
    }
  }

  img {
    width: 100%;
    object-fit: contain;

    @media (max-width: 600px) {
      width: 100%;
      object-fit: contain;
    }
    @media (max-width: 450px) {
      width: 50%;
      height: 100%;
      border-radius: 32px 32px 32px 32px / 22px 22px 22px 22px;
    }
  }
`;
