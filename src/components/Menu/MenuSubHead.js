import React from "react";
import styled from "styled-components";
import { restaurantCardURL } from "../../config";
function MenuSubHead(props) {
  const { RestInfo } = props;
  return (
    <MenuSubHeader>
      <span>
        <img
          height="20px"
          alt=""
          src="https://img.freepik.com/free-icon/time-quarter-hour_318-79674.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.1.1185902625.1677912760&semt=sph"
        />
        <h4>{RestInfo?.cards[0]?.card?.card?.info?.sla?.slaString}</h4>
        <img
          height="20px"
          alt=""
          src="https://img.freepik.com/free-icon/rupee_318-566514.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.2.1185902625.1677912760&semt=sph"
        />
        <h4>{RestInfo?.cards[0]?.card?.card?.info?.costForTwoMessage}</h4>
      </span>
      <OffersCards>
        {RestInfo?.cards[1].card?.card?.gridElements?.infoWithStyle?.offers?.map(
          (item) => {
            return (
              <Cards key={item?.info?.offerIds}>
                <h3>
                  <img
                    height="12px"
                    alt=""
                    src={restaurantCardURL + item?.info?.offerLogo}
                  />
                  {item?.info?.header}
                </h3>
                {item?.info?.couponCode && item?.info?.description && (
                  <span>
                    {item?.info?.couponCode} | {item?.info?.description}
                  </span>
                )}
              </Cards>
            );
          }
        )}
      </OffersCards>
    </MenuSubHeader>
  );
}

export default MenuSubHead;

const MenuSubHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  span {
    display: flex;
    justify-content: flex-start;
    margin-top: 0px;
    img {
      margin-right: 5px;
      margin-top: 0px;
    }
    h4 {
      margin-right: 25px;
      margin-top: 0px;
    }
  }
`;
const OffersCards = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Cards = styled.div`
  flex: 0 0 27%;
  width: 30%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin-right: 10px;
  padding-right: 10px;
  h3 {
    padding: 5px 0px 5px 10px;
    margin: 0px;
    overflow-x: hidden;
    font-size: 13px;

    img {
      padding-right: 5px;
    }
  }
  span {
    width: 90%;
    padding: 10px;
    font-weight: 550;
    font-size: 10px;
    white-space: nowrap; /* Prevent text from wrapping */
    text-overflow: ellipsis; /* Show ellipsis for overflowed content */
    overflow: hidden;
  }
`;
