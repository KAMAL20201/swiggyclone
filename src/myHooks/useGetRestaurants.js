import { useState, useEffect } from "react";
import { useLocationContext } from "../contexts/locationModalContext";


const useGetRestaurants = (resid) => {
  const [restaurantdata, setRestaurantdata] = useState([]);
  const { latitude, longitude } = useLocationContext();
  const [unServiceAble, setUnServiceAble] = useState(false);

  useEffect(() => {
    async function getRestaurants() {
      const data = await fetch(
        `https://swiggyclone-backend-jy63.onrender.com/api/restaurants?lat=${latitude}&lng=${longitude}&page_type=DESKTOP_WEB_LISTING`
      );

      const json = await data.json();

      const restaurants = json?.data?.cards?.filter(
        (item) => item.card?.card?.id === "restaurant_grid_listing"
      );

      const unServiceAble = json?.data?.cards?.filter((item) => {
        return item?.card?.card?.id === "swiggy_not_present";
      });

      if (unServiceAble.length > 0) {
        setUnServiceAble(true);
      }

      setRestaurantdata(
        restaurants[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    }

    getRestaurants();
  }, [latitude, longitude]);

  if (restaurantdata) return restaurantdata;
  else return unServiceAble;
};

export default useGetRestaurants;
