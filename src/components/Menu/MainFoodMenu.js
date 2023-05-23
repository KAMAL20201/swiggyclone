import React, { useState } from "react";
import styled from "styled-components";
import { restaurantCardURL } from "../../config.js";
function MainFoodMenu(props) {
  const { MenuDetails } = props;

  //we go to our own itemsByCategory
  const [showMenu, setShowMenu] = useState(true);
  const [showSubMenu, setShowSubMenu] = useState(false);

  function MenuHandler(index) {
    setShowMenu((prevState) => {
      if (prevState === index) {
        return null; // toggle off if already selected
      } else {
        return index; // toggle on if not already selected
      }
    });
  }

  function SubMenuhandler(mainIndex, categoryIndex) {
    setShowSubMenu((prevState) => {
      if (prevState === `${mainIndex}-${categoryIndex}`) {
        return null; // toggle off if already selected
      } else {
        return `${mainIndex}-${categoryIndex}`; // toggle on if not already selected
      }
    });
  }

  return (
    <Container>
      {MenuDetails?.cards[2].groupedCard.cardGroupMap.REGULAR.cards.map(
        (item, index) => {
          return (
            (item?.card?.card?.categories || item?.card?.card?.itemCards) && (
              <Items>
                <Header onClick={() => MenuHandler(index)}>
                  {item?.card?.card?.categories ? (
                    <h3>{item?.card?.card?.title}</h3>
                  ) : (
                    <>
                      <>
                        <h3>
                          {item?.card?.card?.title} (
                          {item?.card?.card?.itemCards?.length})
                        </h3>
                      </>
                      <>
                        <img
                          height="10px"
                          alt=""
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxINITRLo7bbqNaf3xt8nw-RGPxEszVOZtXQ&usqp=CAU"
                        />
                      </>
                    </>
                  )}
                </Header>
                { showMenu === index && 
                  item?.card?.card?.itemCards?.map((fooditem) => {
                    return (
                      <Cards>
                        <ItemInfo>
                          <p>{fooditem?.card?.info?.name}</p>
                          <p>{fooditem?.card?.info?.price / 100}</p>
                        </ItemInfo>

                        <Image>
                          <img
                            height="100px"
                            src={
                              restaurantCardURL + fooditem?.card?.info?.imageId
                            }
                            alt=""
                          />
                        </Image>
                      </Cards>
                    );
                  })}
                {item?.card?.card?.categories?.map(
                  (category, categoryindex) => {
                    return (
                      <>
                        <SubMenu
                          style={{ cursor: "pointer" }}
                          onClick={() => SubMenuhandler(index,categoryindex)}
                        >
                          <p>
                            {category?.title} ({category?.itemCards?.length})
                          </p>
                          <img
                            height="10px"
                            width="10px"
                            alt=""
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxINITRLo7bbqNaf3xt8nw-RGPxEszVOZtXQ&usqp=CAU"
                          />
                        </SubMenu>

                        {showSubMenu === `${index}-${categoryindex}` &&
                          category?.itemCards?.map((fooditem) => {
                            return (
                              <Cards>
                                <ItemInfo>
                                  <p>{fooditem?.card?.info?.name}</p>
                                  {fooditem?.card?.info?.price ? (
                                    <p>{fooditem?.card?.info?.price / 100}</p>
                                  ) : (
                                    <p>
                                      {
                                        fooditem?.card?.info?.variantsV2
                                          ?.variantGroups[0]?.variations[0]?.price
                                      }
                                    </p>
                                  )}
                                </ItemInfo>
                                <Image>
                                  <img
                                    height="100px"
                                    src={
                                      restaurantCardURL +
                                      fooditem?.card?.info?.imageId
                                    }
                                    alt=""
                                  />
                                </Image>
                              </Cards>
                            );
                          })}
                      </>
                    );
                  }
                )}
              </Items>
            )
          );
        }
      )}
    </Container>
  );
}

export default MainFoodMenu;

const Container = styled.div`
  margin-top: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  h3 {
    font-weight: 700;
    font-size: 20px;
  }
`;
const Items = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 13px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
`;
const Cards = styled.div`
  display: flex;

  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
const Image = styled.div`
  margin: 25px 0px 10px 0px;
  img {
    border-radius: 10px;
  }
`;
const ItemInfo = styled.div``;
const SubMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;
