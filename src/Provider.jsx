import { Provider as ReduxProvider } from 'react-redux';
import store from './store';
import { RestaurantsContextWrapper } from './contexts/allRestaurantsContext';
import { LocationProvider } from './contexts/locationModalContext';
import { SignInModalProvider } from './contexts/signInModalContext';
import { UserContextWrapper } from './contexts/userContext';
const Provider = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <UserContextWrapper>
        <RestaurantsContextWrapper>
          <LocationProvider>
            <SignInModalProvider>{children}</SignInModalProvider>
          </LocationProvider>
        </RestaurantsContextWrapper>
      </UserContextWrapper>
    </ReduxProvider>
  );
};

export default Provider;