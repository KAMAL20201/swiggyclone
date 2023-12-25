import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Shimmer from './components/Shimmer/Shimmer';
import './App.css';
import UnServiceAble from './components/UnServiceAble/UnServiceAble';
import { getRestaurants } from './utils/utils';
import { useLocationContext } from './contexts/locationModalContext';
import { supabase } from './client';
import { useRestaurantsContext } from './contexts/allRestaurantsContext';
import { useUserContext } from './contexts/userContext';
function App() {
  const [inputData, setInputData] = useState('');
  const { latitude, longitude } = useLocationContext();
  const { restaurants, setRestaurants } = useRestaurantsContext();
  const { setUser } = useUserContext();

  const inputHandler = (data) => {
    setInputData(data);
  };

  const fetchData = async () => {
    try {
      const data = await getRestaurants(latitude, longitude);
      setRestaurants(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (restaurants.length === 0) {
      fetchData();
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
      } else {
        const { email, id, user_metadata } = data?.session?.user || {};
        const { full_name } = user_metadata || {};
        setUser({ id, name: full_name, email });

        console.log(data);
      }
    };
    fetchUserDetails();
    // }
  }, [setUser]);

  if (Array.isArray(restaurants)) {
    return restaurants?.length === 0 ? (
      <Shimmer />
    ) : (
      <div className="App">
        <Header getInputData={inputHandler} />
        <Content newRestaurantData={restaurants} newInputData={inputData} />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header getInputData={inputHandler} />
        <UnServiceAble />
        <Footer />
      </div>
    );
  }
}
export default App;
