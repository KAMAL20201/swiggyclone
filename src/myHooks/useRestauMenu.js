import {useState,useEffect} from 'react'
import { useLocationContext } from '../contexts/locationModalContext';
const useRestauMenu = (resid) => {
    const [RestauMenu, setRestaurantMenu] = useState({});

    const {latitude, longitude} = useLocationContext();

    //API call
    useEffect(() => {
        getRestaurantMenu();
      }, []);
    
      async function getRestaurantMenu() {
        const response = await fetch(
          `https://swiggyclone-backend-jy63.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${resid}&submitAction=ENTER`        
        );
        if(!response.ok){
          return;
        }
        const json = await response.json();
          
        
        setRestaurantMenu(json?.data);
      }

      return RestauMenu;
}

export default useRestauMenu
