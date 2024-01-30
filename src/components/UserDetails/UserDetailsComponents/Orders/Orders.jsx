import React, { useEffect, useState } from 'react';
import classes from './style.module.css';
import OrderCard from './OrderCard';
import { supabase } from '../../../../client';
import { useUserContext } from '../../../../contexts/userContext';
const Orders = () => {
  const { user } = useUserContext();

  const [orders, setOrders] = useState([]);

  const fetchPastOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        id,
        order_date, 
        restaurant_name, 
        restaurant_image_id,
        order_items ( item_quantity, itemName )
        `
      )
      .eq('user_id', user?.id)
      .order('order_date', { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setOrders(data);
    }
  };

  useEffect(() => {
    fetchPastOrders();
  }, []);
  return (
    <>
      <div className={classes.headerText}>Past Orders</div>
      {orders?.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </>
  );
};

export default Orders;
