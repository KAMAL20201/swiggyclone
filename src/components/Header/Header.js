import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { ReactComponent as SwiggyLogo } from '../../assets/SwiggyLogo.svg';
import { ReactComponent as Helpicon } from '../../assets/HelpIcon.svg';
import { ReactComponent as SearchIcon } from '../../assets/SearchIcon.svg';
import { ReactComponent as LoginIcon } from '../../assets/LoginIcon.svg';
import { ReactComponent as CartIcon } from '../../assets/CartIcon.svg';
import { ReactComponent as DownArrowIcon } from '../../assets/downarrow.svg';
import { useModal } from '../../contexts/signInModalContext';
import classes from './Header.module.css';
import { useLocationContext } from '../../contexts/locationModalContext';
import SignUp from '../Modals/SignUp/SignUp';
import LocationModal from '../Modals/LocationModal/LocationModal';
import { useUserContext } from '../../contexts/userContext';
import { supabase } from '../../client';
import toast from 'react-hot-toast';
import { useSearchRestaurantContext } from '../../contexts/searchResturantContext';
import { useSelector } from 'react-redux';

function Header(props) {
  const { openModal } = useModal();
  const { currentLocation, openLocationModal } = useLocationContext();
  const { user } = useUserContext();
  const { query, setQuery } = useSearchRestaurantContext();
  const navigate = useNavigate();
  const cartItemsQuantity = useSelector((state) => state.cart.totalQuantity);

  const location = useLocation();

  // Check if the current path is "/"
  const isHomePage = location.pathname === '/';
  function handleInputChange(event) {
    const query = event.target.value.toLowerCase();
    setQuery(query);
    props.getInputData(query);
  }

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Something went wrong');
    } else {
      navigate('/');
      window.location.reload();
    }
  };
  return (
    <Top>
      <Logo>
        <Link to="/">
          <SwiggyLogo />
        </Link>

        <div className={classes.locationContainer} onClick={openLocationModal}>
          <span className={classes.other}>Other</span>
          <span className={classes.location}>
            {currentLocation?.slice(0, 30) + '...'}
          </span>
          <span className={classes.downArrow}>
            <DownArrowIcon />
          </span>
        </div>
      </Logo>

      <Right>
        {isHomePage && (
          <div className={classes.SearchIcon}>
            <input
              type="text"
              className={classes.searchInput}
              value={query}
              placeholder="Search"
              onChange={handleInputChange}
            />
            <SearchIcon />
          </div>
        )}

        <NavLink to="/help" className={classes.navLink}>
          <Helpicon />
          <span className="offers-text">Help</span>
        </NavLink>

        {user?.id ? (
          <div className={classes.popoverContainer}>
            <NavLink to="/user-details" className={classes.login}>
              <LoginIcon />
              <span className={classes.SignInText}>{user?.name}</span>
            </NavLink>
            <div className={classes.popoverWrapper}>
              <div className={classes.popoverContent}>
                <Link to="/user-details" className={classes.popoverItem}>
                  Profile
                </Link>
                <Link to="/user-details" className={classes.popoverItem}>
                  Orders
                </Link>
                <Link to="/user-details" className={classes.popoverItem}>
                  Swiggy One
                </Link>
                <Link
                  to="/"
                  className={classes.popoverItem}
                  onClick={signOutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.login} onClick={openModal}>
            <LoginIcon />
            <span className={classes.SignInText}>Sign In</span>
          </div>
        )}

        <NavLink
          to="/cart"
          className={clsx(
            classes.cart,
            cartItemsQuantity > 0 && classes.cartActive
          )}
        >
          <CartIcon />
          <span
            className={clsx(
              classes.cartItemsNumber,
              cartItemsQuantity > 0 && classes.cartItemsNumberActive,
              cartItemsQuantity > 9 && classes.forcedRight
            )}
          >
            {cartItemsQuantity}
          </span>
          <span className="offers-text">Cart</span>
        </NavLink>
      </Right>

      {!user?.id && <SignUp />}
      <LocationModal />
    </Top>
  );
}

export default Header;

const Top = styled.nav`
  color: #fff;

  background-color: white;
  z-index: 999;
  height: 60px;
  min-height: 60px;
  display: flex;
  padding: 10px 7vw;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.3);
  margin-bottom: 0px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 900px) {
    padding: 10px 5vw;
  }
  @media (max-width: 720px) {
    padding: 10px 3vw;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2vh 2vw 2vh 0vh;
  gap: 60px;
  @media (max-width: 1024px) {
    gap: 40px;
  }

  @media (max-width: 720px) {
    gap: 30px;
  }
  @media (max-width: 600px) {
    gap: 15px;
  }

  input {
    border: none;
    border: 2px solid #ccc;
    padding: 1vh;
    margin-right: 0.5vw;
    width: 150px;
    height: 3vh;
    outline: none;

    @media (max-width: 900px) {
      width: 100px;
    }
  }
  img {
    height: 1.5em;
    width: 1.5em;
    margin-right: 0.5vw;
    cursor: pointer;
    @media (max-width: 600px) {
      margin-right: 6px;
      height: 1.3em;
      width: 1.3em;
    }
  }

  a {
    svg {
      margin-right: 5px;
    }
    &.active {
      color: #fc8019;
      svg {
        fill: #fc8019;
      }
    }
    &:hover {
      color: #fc8019;
    }

    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    cursor: pointer;
  }
  .offers-text {
    margin-right: 5px;
    font-weight: 600;
    font-size: 12px;
    @media (max-width: 600px) {
      display: none;
      font-size: 10px;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  // aspect-ratio: 3/2;
  // object-fit: contain;
`;
