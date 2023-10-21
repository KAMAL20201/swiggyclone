import {useState,useEffect} from 'react'
import { useLocationContext } from '../../contexts/locationModalContext';

const useGetRestaurants = (resid) => {
    const [restaurantdata, setRestaurantdata] = useState([]);
    // const {latitude, longitude} = useLocationContext();

    useEffect(() => {
        async function getRestaurants() {
            const data = await fetch(
              `https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.742522447643577&lng=76.78731199007858&page_type=DESKTOP_WEB_LISTING`
            );
    
    
            const json = await data.json();
      
            const restaurants = json?.data?.cards?.filter(
              (item) => item.card?.card?.id === "restaurant_grid_listing"
            );
          
            setRestaurantdata(
              restaurants[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
            );
    
    
          }

          getRestaurants();
      }, []);

      return restaurantdata;
}

export default useGetRestaurants;
