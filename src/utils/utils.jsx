export const getRestaurants = async (latitude, longitude) => {
  try {
    const data = await fetch(
      `https://swiggyclone-backend-jy63.onrender.com/api/restaurants?lat=${latitude}&lng=${longitude}`,
    );
    const json = await data.json();

    const restaurants = json?.data?.cards?.filter(
      (item) => item.card?.card?.id === 'restaurant_grid_listing',
    );

    // const unServiceAble = json?.data?.cards?.filter((item) => {
    //   return item?.card?.card?.id === "swiggy_not_present";
    // });

    // if (unServiceAble.length > 0) {
    //   return false;
    // }
    return restaurants[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  } catch (err) {
    throw err;
  }
};
