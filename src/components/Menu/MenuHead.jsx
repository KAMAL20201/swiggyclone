import React from 'react';
import styled from 'styled-components';

function MenuHead(props) {
  const { RestMenu } = props; //RestMenu json.data

  const menuDetails = RestMenu?.cards?.filter(
    (card) => card?.card?.card?.info?.id
  );

  const menuHeadInfo = menuDetails[0]?.card?.card?.info;
  return (
    <MenuHeads>
      <RestauInfo>
        <h3>{menuHeadInfo?.name}</h3>
        <h6>{menuHeadInfo?.cuisines?.join(', ')}</h6>
        <h6>
          {menuHeadInfo?.areaName}, {menuHeadInfo?.sla?.lastMileTravelString}
        </h6>
        <p>{menuHeadInfo?.feeDetails?.message}</p>
      </RestauInfo>
      <Rating>
        <h3>{menuHeadInfo?.avgRatingString} &#9733; </h3>
        <p>{menuHeadInfo?.totalRatingsString}</p>
      </Rating>
    </MenuHeads>
  );
}

export default MenuHead;

const MenuHeads = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  &::after {
    content: '';
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
  p:nth-child(4) {
    margin-top: 10px;
    /* font-weight:400; */
    font-size: 12px;
  }
  h6 {
    margin: 0px;
    font-weight: 400;
    color: #7e808c;
  }
`;

const Rating = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  height: 100px;
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
