import Help from './components/Help/Help';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RestaurantMenu from './components/Menu/RestaurantMenu';
import Cart from './components/Cart/Cart';
import PartnerOnboard from './components/Help/PartnerOnboard';
import Legals from './components/Help/Legals';
import Faqs from './components/Help/Faqs';
import OrderDone from './components/Cart/OrderDone';
import Layout from './Layout';
import ScrollToTop from './utils/scrollToTop';
import UserDetailsLayout from './components/UserDetails/UserDetailsLayout';
import Orders from './components/UserDetails/UserDetailsComponents/Orders/Orders';
import SwiggyOne from './components/UserDetails/UserDetailsComponents/SwiggyOne';
import Addresses from './components/UserDetails/UserDetailsComponents/Addresses';
import Settings from './components/UserDetails/UserDetailsComponents/Settings';
import ResetPassword from './components/Modals/ResetPassword/ResetPassword';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
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
          <Route
            path="/user-details"
            element={<UserDetailsLayout />}
            children={[
              <Route index={true} element={<Orders />} />,
              <Route path="orders" element={<Orders />} />,
              <Route path="super" element={<SwiggyOne />} />,
              <Route path="manage_addresses" element={<Addresses />} />,
              <Route path="settings" element={<Settings />} />,
            ]}
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/orderDone" element={<OrderDone />} />
          <Route path="/restaurant/:resid" element={<RestaurantMenu />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
