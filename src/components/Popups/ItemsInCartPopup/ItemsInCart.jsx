import React from 'react';
import classes from './styles.module.css';
import { useNewCartContext } from '../../../contexts/NewCartContext';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
const ItemsInCart = ({ onStartAfresh }) => {
  const { isCartPopupOpen, setIsCartPopupOpen, setContinueWithAnotherCart } =
    useNewCartContext();

  const dispatch = useDispatch();
  return (
    <>
      {isCartPopupOpen && (
        <div className={classes.popupContainer}>
          <div className={classes.header}>
            <div className={classes.title}>Items already in cart</div>
            <div className={classes.description}>
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </div>
          </div>
          <div className={classes.buttons}>
            <button
              className={classes.cancel}
              onClick={() => setIsCartPopupOpen(false)}
            >
              NO
            </button>
            <button
              className={classes.continue}
              onClick={() => {
                setIsCartPopupOpen(false);
                setContinueWithAnotherCart(true);
                dispatch(cartActions.clearCart());
                onStartAfresh();
              }}
            >
              YES, START AFRESH
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemsInCart;
