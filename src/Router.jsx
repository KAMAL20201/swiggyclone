import Help from './components/Help/Help';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import PartnerOnboard from './components/Help/PartnerOnboard';
import Legals from './components/Help/Legals';
import Faqs from './components/Help/Faqs';
import OrderDone from './components/Cart/OrderDone';
import Layout from './Layout';
import ScrollToTop from './utils/scrollToTop';
import SwiggyOne from './components/UserDetails/UserDetailsComponents/SwiggyOne';
import Addresses from './components/UserDetails/UserDetailsComponents/Addresses';
import Settings from './components/UserDetails/UserDetailsComponents/Settings';
import ResetPassword from './components/Modals/ResetPassword/ResetPassword';
import Shimmer from './components/Shimmer/Shimmer';

const RestaurantMenu = lazy(() => import('./components/Menu/RestaurantMenu'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Orders = lazy(() =>
  import('./components/UserDetails/UserDetailsComponents/Orders/Orders')
);
const UserDetailsLayout = lazy(() =>
  import('./components/UserDetails/UserDetailsLayout')
);

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Shimmer />}>
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

            <Route
              path="/cart"
              element={
                <Suspense>
                  <Cart />
                </Suspense>
              }
            />
            <Route path="/orderDone" element={<OrderDone />} />
            <Route
              path="/restaurant/:resid"
              element={
                <Suspense fallback={<Shimmer />}>
                  <RestaurantMenu />
                </Suspense>
              }
            />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
