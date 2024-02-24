import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { restaurantCardURL } from '../../utils/utils';
import AddedToCart from './AddedToCart.js';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice.js';
import { useSelector } from 'react-redux';
import { css } from 'styled-components';
import { useNewCartContext } from '../../contexts/NewCartContext';
import ItemsInCart from '../Popups/ItemsInCartPopup/ItemsInCart';
function MainFoodMenu(props) {
  const totalquantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const { MenuDetails } = props;

  const newMenu = MenuDetails?.cards?.filter((card) => card?.groupedCard);
  const restaurantNameCard = MenuDetails?.cards?.filter(
    (card) => card?.card?.card?.info?.name
  );

  const currentRestaurantIdInCart = useSelector(
    (state) => state.cart.restaurantId
  );
  const {
    setIsCartPopupOpen,
    continueWithAnotherCart,
    setContinueWithAnotherCart,
  } = useNewCartContext();

  const {
    name: restaurantName,
    id: restaurantId,
    cloudinaryImageId,
  } = restaurantNameCard[0]?.card?.card?.info;

  const cardsLength =
    newMenu[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.length;

  const cardsArray = Array(cardsLength).fill(1);

  const [showMenu, setShowMenu] = useState(cardsArray);
  const [currentItemAdded, setCurrentItemAdded] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(() => {
    const initialShowSubMenu = {};
    newMenu[0].groupedCard?.cardGroupMap?.REGULAR?.cards.forEach(
      (item, index) => {
        if (item?.card?.card?.categories) {
          item.card.card.categories.forEach((_, categoryIndex) => {
            const categoryKey = `${index}-${categoryIndex}`;
            initialShowSubMenu[categoryKey] = false;
          });
        }
      }
    );
    return initialShowSubMenu;
  });

  function MenuHandler(index) {
    setShowMenu((prevState) => {
      if (prevState[index] === 0) {
        prevState[index] = 1;
      } else {
        prevState[index] = 0;
      }
      return [...prevState];
    });
  }

  function SubMenuhandler(mainIndex, categoryIndex) {
    setShowSubMenu((prevState) => {
      const categoryKey = `${mainIndex}-${categoryIndex}`;
      return {
        ...prevState,
        [categoryKey]: !prevState[categoryKey],
      };
    });
  }

  const handleAddButtonClick = (fooditem) => {
    const id = fooditem?.card?.info?.id;
    const name = fooditem?.card?.info?.name;
    const price = fooditem?.card?.info?.price;
    const description = fooditem?.card?.info?.description;

    if (
      currentRestaurantIdInCart &&
      restaurantId !== currentRestaurantIdInCart
    ) {
      if (continueWithAnotherCart) {
        setContinueWithAnotherCart(false);
      } else {
        setIsCartPopupOpen(true);
        return;
      }
    }

    if (price) {
      dispatch(
        cartActions.addToCart({
          id,
          name,
          price,
          description,
          restaurantName,
          restaurantId,
          cloudinaryImageId,
        })
      );
    } else {
      const price = fooditem?.card?.info?.defaultPrice;
      dispatch(
        cartActions.addToCart({
          id,
          name,
          price,
          description,
          restaurantName,
          restaurantId,
          cloudinaryImageId,
        })
      );
    }
  };

  return (
    <Container>
      {newMenu[0].groupedCard?.cardGroupMap?.REGULAR?.cards.map(
        (item, index) => {
          return (
            (item?.card?.card?.categories || item?.card?.card?.itemCards) && (
              <Items key={index}>
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

                {showMenu[index] === 1 &&
                  item?.card?.card?.itemCards?.map((fooditem, idx) => {
                    return (
                      <Cards key={idx}>
                        <ItemInfo>
                          <p>{fooditem?.card?.info?.name}</p>
                          <p>
                            &#8377;
                            {(fooditem?.card?.info?.price ||
                              fooditem?.card?.info?.defaultPrice) / 100}
                          </p>
                        </ItemInfo>

                        <Image>
                          {fooditem?.card?.info?.imageId && (
                            <img
                              height="100px"
                              src={
                                restaurantCardURL +
                                fooditem?.card?.info?.imageId
                              }
                              alt={fooditem?.card?.info?.name}
                              loading="lazy"
                            />
                          )}

                          <Button
                            hasImageId={fooditem?.card?.info?.imageId}
                            onClick={() => {
                              handleAddButtonClick(fooditem);
                              setCurrentItemAdded(fooditem);
                            }}
                          >
                            ADD
                          </Button>
                        </Image>
                      </Cards>
                    );
                  })}

                {item?.card?.card?.categories?.map(
                  (category, categoryindex) => {
                    const categoryKey = `${index}-${categoryindex}`;
                    return (
                      <>
                        <SubMenu
                          key={categoryKey}
                          style={{ cursor: 'pointer' }}
                          onClick={() => SubMenuhandler(index, categoryindex)}
                          borderShort={showSubMenu[categoryKey]}
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

                        {showSubMenu[categoryKey] &&
                          category?.itemCards?.map((fooditem, idx) => {
                            return (
                              <Cards key={idx}>
                                <ItemInfo>
                                  <p>{fooditem?.card?.info?.name}</p>
                                  {fooditem?.card?.info?.price ? (
                                    <p>{fooditem?.card?.info?.price / 100}</p>
                                  ) : (
                                    <p>
                                      {
                                        fooditem?.card?.info?.variantsV2
                                          ?.variantGroups[0]?.variations[0]
                                          ?.price
                                      }
                                    </p>
                                  )}
                                </ItemInfo>
                                <Image>
                                  {fooditem?.card?.info?.imageId && (
                                    <img
                                      height="100px"
                                      src={
                                        restaurantCardURL +
                                        fooditem?.card?.info?.imageId
                                      }
                                      alt=""
                                      loading="lazy"
                                    />
                                  )}

                                  <Button
                                    hasImageId={fooditem?.card?.info?.imageId}
                                    onClick={() => {
                                      handleAddButtonClick(fooditem);
                                      setCurrentItemAdded(fooditem);
                                    }}
                                  >
                                    ADD
                                  </Button>
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
      <ItemsInCart
        onStartAfresh={() => handleAddButtonClick(currentItemAdded)}
      />
      {totalquantity > 0 && createPortal(<AddedToCart />, document.body)};
    </Container>
  );
}

export default MainFoodMenu;

const Button = styled.button`
  position: relative;
  left: 16%;
  bottom: 10%;
  padding: 0px 20px;
  color: green;
  font-weight: 600;
  font-size: 12px;
  width: 100px;
  height: 30px;
  ${(props) =>
    !props.hasImageId &&
    css`
      left: -33%;
    `}
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

const Cards = styled.div`
  display: flex;

  justify-content: space-between;
  border-bottom: 0.5px solid #d3d3d3;
`;

const SubMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom:; */
  margin-bottom: 20px;
  border-bottom: ${(props) =>
    props.borderShort ? 'none' : ' 0.5px solid #d3d3d3'};

  p {
    border-bottom: ${(props) =>
      props.borderShort ? ' 0.5px solid #d3d3d3' : 'none'};
    margin: 0px;
    padding: 20px 0px;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 16px solid #f1f1f6;
  padding: 10px;

  ${Cards}:last-child {
    border-bottom: none;
  }

  ${SubMenu}:last-child {
    border-bottom: none;
    margin: 0px;
  }
`;

const Container = styled.div`
  margin-top: 30px;

  ${Items}:last-child {
    border-bottom: none;
  }
`;

const Image = styled.div`
  margin: 25px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  img {
    border-radius: 10px;
    width: 158px;
  }
`;
const ItemInfo = styled.div``;
