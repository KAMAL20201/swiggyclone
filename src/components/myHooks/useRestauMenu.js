import React,{useState,useEffect} from 'react'

const useRestauMenu = (resid) => {
    const [RestauMenu, setRestaurantMenu] = useState({});

    //API call
    useEffect(() => {
        getRestaurantMenu();
      }, []);
    
      async function getRestaurantMenu() {
        const data = await fetch(
          "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.7333148&lng=76.7794179&restaurantId="+resid+"&submitAction=ENTER" 
        
        );
        const json = await data.json();
          
        
        setRestaurantMenu(json?.data);
      }

      return RestauMenu;
}

export default useRestauMenu
