import React from 'react';
import styled from 'styled-components';

function MenuHead(props) {
    const { RestMenu } = props; //RestMenu json.data
    
  return (
    <MenuHeads>
          <RestauInfo>
            <h3>{RestMenu?.cards[0]?.card?.card?.info?.name}</h3>
            <h6>{RestMenu?.cards[0]?.card?.card?.info?.cuisines?.join(", ")}</h6>
            <p>
              {RestMenu?.cards[0]?.card?.card?.info?.areaName}, {RestMenu?.cards[0]?.card?.card?.info?.sla?.lastMileTravelString}
            </p>
            <p>{RestMenu?.cards[0]?.card?.card?.info?.feeDetails?.message}</p>
          </RestauInfo>
          <Rating>
            <h3>{RestMenu?.cards[0]?.card?.card?.info?.avgRatingString} &#9733; </h3>
            <p>{RestMenu?.cards[0]?.card?.card?.info?.totalRatingsString}</p>
          </Rating>
        </MenuHeads>
  )
}

export default MenuHead;

const MenuHeads = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  &::after {
    content: "";
    position: absolute;
    top: 270px;
    left: 50%; /* set the left position to center the border */
    transform: translateX(-50%);
    width: 60%; /* set the width of the border */
    height: 2px; /* set the height of the border */
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const RestauInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
  p:nth-child(4){
    margin-top:10px;
    /* font-weight:400; */
    font-size:12px;
  }
  h6 {
    margin: 0px;
    font-weight:400;
  }
  p {
    margin: 0px;
    font-weight:400;
  }
`;

const Rating = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  height:100px;
  border-radius: 5px;
  h3 {
    border-bottom: 1px solid black;
    padding: 7px 5px 7px 24px;
    margin-bottom: 10px;
    margin-top: 0px;
  }
  p {
    margin: 0px;
    padding: 7px;
  }
`;