import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import { RestaurantsContextWrapper } from './contexts/allRestaurantsContext';
import { LocationProvider } from './contexts/locationModalContext';
import { SignInModalProvider } from './contexts/signInModalContext';
import { UserContextWrapper } from './contexts/userContext';
import { SearchRestaurantWrapper } from './contexts/searchResturantContext';
const Provider = ({ children }) => {
  return (
    <UserContextWrapper>
      <ReduxProvider store={store}>
        <RestaurantsContextWrapper>
          <LocationProvider>
            <SearchRestaurantWrapper>
              <SignInModalProvider>{children}</SignInModalProvider>
            </SearchRestaurantWrapper>
          </LocationProvider>
        </RestaurantsContextWrapper>
      </ReduxProvider>
    </UserContextWrapper>
  );
};

export default Provider;
