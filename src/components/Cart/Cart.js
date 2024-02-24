import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { supabase } from '../../client';
import { useUserContext } from '../../contexts/userContext';
import { restaurantCardURL } from '../../utils/utils';
import classes from './style.module.css';
import { useModal } from '../../contexts/signInModalContext';
import toast from 'react-hot-toast';

function Cart() {
  const cartItem = useSelector((state) => state.cart.cartItems);

  const [cartItems, setCartItems] = useState(cartItem);
  const restaurantName = useSelector((state) => state.cart.restaurantName);
  const restaurantId = useSelector((state) => state.cart.restaurantId);
  const { openModal } = useModal();
  const cloudinaryImageId = useSelector(
    (state) => state.cart.cloudinaryImageId
  );

  useEffect(() => {
    const cartItemsFromLocalStorage = JSON.parse(
      localStorage.getItem('cartItems')
    );
    setCartItems(cartItemsFromLocalStorage?.cartItems || cartItem);
  }, [cartItem]);

  const dispatch = useDispatch();
  const [showProgress, setShowProgress] = useState(false);

  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleSendOrder = async () => {
    setShowProgress(true);

    if (!user?.id) {
      openModal();
      toast('Please login to place order', {
        icon: '🍔',
        duration: 4000,
        position: 'bottom-center',
      });
      setShowProgress(false);
      return;
    }
    //add order details in db
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user?.id,
          restaurant_name: restaurantName,
          restaurant_id: restaurantId,
          restaurant_image_id: cloudinaryImageId,
        },
      ])
      .select();

    const orderId = data && data[0]?.id;

    //add orderItems in db

    if (error) {
      console.log(error);
    } else {
      cartItems.map(async (cartItem) => {
        const { data, err } = await supabase
          .from('order_items')
          .insert([
            {
              order_id: orderId,
              itemName: cartItem?.name,
              item_quantity: cartItem?.quantity,
            },
          ])
          .select();

        if (err) {
          console.log(err);
        } else {
          setTimeout(() => {
            navigate('/orderDone');
            setShowProgress(false);
            dispatch(cartActions.clearCart());
          }, 3000); // 3 seconds delay
        }
      });
    }
  };

  const totalAmount = cartItems.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.totalPrice;
  }, 0);

  const removeItemHandler = (cartItem) => {
    dispatch(cartActions.removeFromCart(cartItem.id));
  };
  const addItemHandler = (cartItem) => {
    dispatch(
      cartActions.addToCart({
        id: cartItem.id,
        price: cartItem.price,
        name: cartItem.name,
        description: cartItem.description,
        restaurantName: restaurantName,
        restaurantId: restaurantId,
        cloudinaryImageId: cloudinaryImageId,
      })
    );
  };
  return (
    <>
      <Container>
        <CartItems>
          {cartItems.length === 0 ? (
            <>
              <img
                className={classes.emptyCartImg}
                loading="lazy"
                alt=""
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
              />
              <h3 className={classes.emptyCartText}>Your Cart is empty</h3>
              <h6>You can go to home page to view more restaurants</h6>
            </>
          ) : (
            <>
              <div className={classes.restaurantHeader}>
                <img
                  src={`${restaurantCardURL}${cloudinaryImageId}`}
                  alt="restaurant"
                  className={classes.restaurantImg}
                  loading="lazy"
                />
                <h3 className={classes.restaurantName}>{restaurantName}</h3>
              </div>
              {cartItems.map((cartItem, index) => {
                return (
                  <Item key={index}>
                    <p> {cartItem.name}</p>
                    <Amount>
                      <IncrementButton
                        onClick={() => removeItemHandler(cartItem)}
                      >
                        -
                      </IncrementButton>
                      <h4>{cartItem.quantity}</h4>
                      <DecrementButton onClick={() => addItemHandler(cartItem)}>
                        +
                      </DecrementButton>
                    </Amount>
                    <p> &#x20B9; {cartItem.totalPrice / 100.0}</p>
                  </Item>
                );
              })}
            </>
          )}

          {cartItems.length > 0 && (
            <Button onClick={handleSendOrder}>
              {showProgress ? (
                <Progress />
              ) : (
                <>ORDER NOW &#x20B9;{totalAmount / 100.0}</>
              )}
            </Button>
          )}
        </CartItems>
      </Container>
    </>
  );
}

export default Cart;

const progressAnimation = keyframes`
   to {
      transform: rotate(1turn);
   }
`;

const Progress = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, white);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0);
  animation: ${progressAnimation} 1s infinite linear;
`;

const IncrementButton = styled.div`
  width: 33.33%;
  color: #60b246;
  font-size: 16px;
  cursor: pointer;
`;

const DecrementButton = styled.div`
  width: 33.33%;
  color: #60b246;
  font-size: 16px;
  cursor: pointer;
`;
const Amount = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  font-size: 12px;
  height: 30px;
  border: 1px solid #d4d5d9;
  font-weight: 600;
  line-height: 30px;
  position: relative;
  text-align: center;
  background-color: #fff;
  padding: 0px 4px;
  h4 {
    margin: 0px;
    padding: 0px 5px;
    width: 33.33%;
    color: #60b246;
  }
  margin-right: 10px;
`;
const Button = styled.button`
  display: flex;
  width: 50%;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;
  background-color: rgb(96, 178, 70);
  color: white;
  border: none;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #e9ecee;
  height: 100%;
`;
const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7% 10%;
  justify-content: center;
  background-color: #fff;
  height: 100%;
  padding: 20px 30px;
  color: #60b246;

  h6 {
    margin: auto;
    padding: 10px;
    color: rgba(0, 0, 0, 0.3);
  }
  h6 {
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p:first-child {
    margin-left: 12%;
    flex: 1;
  }
  > *:not(:first-child) {
    margin-left: 10px;
    font-size: 13px;
    color: #535665;
    flex: 0.1;
  }
`;
