import { useEffect } from 'react';
import Content from './components/Content/Content';
import Shimmer from './components/Shimmer/Shimmer';
import './App.css';
import UnServiceAble from './components/UnServiceAble/UnServiceAble';
import { getRestaurants } from './utils/utils';
import { useLocationContext } from './contexts/locationModalContext';
import { useRestaurantsContext } from './contexts/allRestaurantsContext';
import toast from 'react-hot-toast';
function App() {
  const { latitude, longitude } = useLocationContext();
  const { restaurants, setRestaurants } = useRestaurantsContext();

  const fetchData = async () => {
    try {
      const data = await getRestaurants(latitude, longitude);
      setRestaurants(data);
    } catch (err) {
      toast.error('Something went wrong !!', {
        duration: 4000,
        position: 'bottom-center',
      });
      console.error(err);
    }
  };

  useEffect(() => {
    if (!latitude || !longitude) return;
    fetchData();
  }, [latitude, longitude]);

  if (Array.isArray(restaurants)) {
    return restaurants?.length === 0 ? (
      <Shimmer />
    ) : (
      <div className="App">
        <Content newRestaurantData={restaurants} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <UnServiceAble />
      </div>
    );
  }
}
export default App;
