import React from 'react';
import classes from './style.module.css';
import { formatDate, restaurantCardURL } from '../../../../utils/utils';

const OrderCard = ({ order }) => {
  const totalPrice = order?.order_items?.reduce((acc, curr) => {
    acc += curr.item_price;
    return acc;
  }, 0);

  const formattedDate = formatDate(order?.order_date);

  return (
    <div className={classes.cardCon}>
      <div className={classes.orderDetailsCon}>
        <div className={classes.restaurantImage}>
          <img
            className={classes.image}
            height="200"
            width="300"
            alt="restaurant"
            src={`${restaurantCardURL}/${order?.restaurant_image_id}`}
          />
        </div>
        <div className={classes.orderDetails}>
          <div className={classes.restaurantName}>{order?.restaurant_name}</div>
          <div className={classes.orderIdCon}>
            <span>
              ORDER #{order?.id} | {formattedDate}
            </span>
          </div>
        </div>
      </div>
      <div className={classes.itemDetailsCon}>
        <div className={classes.orderItems}>
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
