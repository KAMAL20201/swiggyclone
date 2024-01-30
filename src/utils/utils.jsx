import Cookies from 'universal-cookie';

export const getRestaurants = async (latitude, longitude) => {
  try {
    const data = await fetch(
      `https://swiggyclone-backend-jy63.onrender.com/api/restaurants?lat=${latitude}&lng=${longitude}`
    );
    const json = await data.json();

    const restaurants = json?.data?.cards?.filter(
      (item) => item.card?.card?.id === 'restaurant_grid_listing'
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

export const getLocationFromCookies = () => {
  const cookies = new Cookies();
  const userLocationValue = cookies.get('userLocation');

  if (userLocationValue) {
    return userLocationValue;
  }
  return null;
};

export const setUserLocation = (userLocation) => {
  const cookies = new Cookies();
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  cookies.set('userLocation', userLocation, {
    path: '/',
    expires: expirationDate,
  });
};

const deploymentEnvironment = process.env.REACT_APP_DEPLOYMENT_ENVIRONMENT;

export const isDevEnvironment = deploymentEnvironment === 'LOCAL';

export const BASE_URL = isDevEnvironment
  ? 'http://localhost:3000'
  : 'https://swiggyclone-kamal.vercel.app/';

  export const restaurantCardURL =
  'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/';
