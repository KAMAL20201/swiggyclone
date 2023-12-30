import React from 'react';
import classes from './styles.module.css';
import { IoBagHandle } from 'react-icons/io5';
import { SiSwiggy } from 'react-icons/si';
import { IoLocation } from 'react-icons/io5';
import { IoSettings } from 'react-icons/io5';
import { NavLink, Outlet } from 'react-router-dom';
import { clsx } from 'clsx';
import { useLocation } from 'react-router-dom';

const UserDetailsLayout = () => {
  const location = useLocation();
  return (
    <div className={classes.UserDetailsCon}>
      <div className={classes.UserDetailHeader}>
        <div className={classes.editProfileBtn}>Edit Profile</div>
        <div className={classes.userName}>Kamal</div>
        <div className={classes.userDetails}>
          <span>User Email</span>
        </div>
      </div>
      <div className={classes.userDetailsContent}>
        <div className={classes.detailsTabsCon}>
          <ul className={classes.detailsTabs}>
            <li
              className={clsx(
                (location.pathname === '/user-details/orders' ||
                  location.pathname === '/user-details') &&
                  classes.activeLink,
                classes.listItem
              )}
            >
              <NavLink
                className={clsx(classes.listLink)}
                to="/user-details/orders"
              >
                <span className={classes.tabIcon}>
                  <IoBagHandle />
                </span>
                <span className={classes.tabTitle}>Orders</span>
              </NavLink>
            </li>
            <li
              className={clsx(
                location.pathname === '/user-details/super' && classes.activeLink,
                classes.listItem
              )}
            >
              <NavLink className={classes.listLink} to="/user-details/super">
                <span className={classes.tabIcon}>
                  <SiSwiggy />
                </span>
                <span className={classes.tabTitle}>Swiggy One</span>
              </NavLink>
            </li>
            <li
              className={clsx(
                location.pathname === '/user-details/manage_addresses' &&
                  classes.activeLink,
                classes.listItem
              )}
            >
              <NavLink
                className={classes.listLink}
                to="/user-details/manage_addresses"
              >
                <span className={classes.tabIcon}>
                  <IoLocation />
                </span>
                <span className={classes.tabTitle}>Addresses</span>
              </NavLink>
            </li>
            <li
              className={clsx(
                location.pathname === '/user-details/settings' &&
                  classes.activeLink,
                classes.listItem
              )}
            >
              <NavLink className={classes.listLink} to="/user-details/settings">
                <span className={classes.tabIcon}>
                  <IoSettings />
                </span>
                <span className={classes.tabTitle}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={classes.tabDataCon}>
          {' '}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsLayout;
