import React from 'react';
import classes from './style.module.css';

const OrderCard = ({ order }) => {
  const totalPrice = order?.order_items?.reduce((acc, curr) => {
    acc += curr.item_quantity * 100;
    return acc;
  }, 0);
  return (
    <div className={classes.cardCon}>
      <div className={classes.orderDetailsCon}>
        <div className={classes.restaurantImage}>
          <img
            className={classes.image}
            height="200"
            width="300"
            alt="restaurant"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_200,c_fill/85ccae4e3576f9330af102c46ca85395"
          />
        </div>
        <div className={classes.orderDetails}>
          <div className={classes.restaurantName}>{order?.restaurant_name}</div>
          <div className={classes.orderIdCon}>
            {`ORDER #${order?.id} | ${order?.order_date}`}
          </div>
        </div>
      </div>
      <div className={classes.itemDetailsCon}>
        <div>
          {order?.order_items?.map((item, index) => (
            <span key={item.itemId} className={classes.itemDetails}>
              {item.itemName} x {item.item_quantity}
              {index < order.order_items.length - 1 && ',   '}
            </span>
          ))}
        </div>

        <div className={classes.totalPrice}>Total Paid : ₹ {totalPrice}</div>
      </div>
    </div>
  );
};

export default OrderCard;
