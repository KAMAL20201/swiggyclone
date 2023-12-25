import Help from './components/Help/Help';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RestaurantMenu from './components/Menu/RestaurantMenu';
import Cart from './components/Cart/Cart';
import PartnerOnboard from './components/Help/PartnerOnboard';
import Legals from './components/Help/Legals';
import Faqs from './components/Help/Faqs';
import OrderDone from './components/Cart/OrderDone';
import UserDetails from './components/UserDetails';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/help"
          element={<Help />}
          children={[
            <Route index={true} element={<PartnerOnboard />} />,
            <Route path="legal" element={<Legals />} />,
            <Route path="faqs" element={<Faqs />} />,
          ]}
        />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderDone" element={<OrderDone />} />
        <Route path="/restaurant/:resid" element={<RestaurantMenu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
