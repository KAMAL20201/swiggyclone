import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { css } from "styled-components";
import { useDispatch } from "react-redux";
import {
  setUserToAuthenticated,
  setUserName,
  setAuthToken,
} from "../../store/userAuthSlice";
import { useNavigate, useLocation } from "react-router-dom";

function Header(props) {
  const [query, setQuery] = useState("");
  const { isUserAuthenicated, userName, authToken } = useSelector(
    (state) => state.user
  );
  const [showLogout, setShowLogout] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinkContainerRef = useRef(null);
  const logoutDivRef = useRef(null);

  const location = useLocation();

  // Check if the current path is "/"
  const isHomePage = location.pathname === "/";

  if (authToken) {
    sessionStorage.setItem("token", JSON.stringify(authToken));
  }
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    // If the token exists, set the authentication state in the Redux store
    if (storedToken) {
      const data = JSON.parse(storedToken);
      dispatch(setUserToAuthenticated(true));
      dispatch(setUserName(data.user.user_metadata.full_name));
      dispatch(setAuthToken(data));
    }
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navLinkContainerRef.current &&
        !navLinkContainerRef.current.contains(event.target) &&
        logoutDivRef.current &&
        !logoutDivRef.current.contains(event.target)
      ) {
        setShowLogout(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  function handleInputChange(event) {
    const query = event.target.value.toLowerCase();
    setQuery(query);
    props.getInputData(query);
  }
  const handleLogout = () => {
    sessionStorage.removeItem("token");

    // Set the user as unauthenticated in the Redux store
    dispatch(setUserToAuthenticated(false));
    dispatch(setUserName(""));
    dispatch(setAuthToken(null));

    // Navigate to the homepage or any desired location after logout
    navigate("/");
  };

  return (
    <Top>
      <Logo>
        <Link to="/">
          <img
            className="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhezojWn_3WE-Wvw_MOtFKigLVuHYxjxBQw&usqp=CAU"
            width="40px"
            height="60px"
            alt="logo"
          />
        </Link>
      </Logo>

      <Right>
        {isHomePage && (
          <>
            <input
              type="text"
              value={query}
              placeholder="Search"
              onChange={handleInputChange}
            />
            <img
              alt="logo"
              src="https://img.freepik.com/free-icon/loupe_318-122653.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.1.1185902625.1677912760&semt=sph"
              height="25px"
            />
          </>
        )}

        <NavLink to="/offers">
          <img
            alt="logo"
            src="https://img.freepik.com/free-icon/discount_318-902372.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.1.1185902625.1677912760&semt=sph"
            height="25px"
          />
          <span className="offers-text">Offers</span>
        </NavLink>

        <NavLink to="/help">
          <img
            alt="logo"
            src="https://img.freepik.com/free-icon/question_318-933114.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.1.1185902625.1677912760&semt=sph"
            height="25px"
          />{" "}
          <span className="offers-text">Help</span>
        </NavLink>

        {isUserAuthenicated === false ? (
          <NavLink to="/signup">
            <img
              alt="logo"
              src="https://img.freepik.com/free-icon/user_318-932533.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.2.1185902625.1677912760&semt=sph"
              height="25px"
            />
            <span className="offers-text">Sign In</span>
          </NavLink>
        ) : (
          <NavLinkContainer ref={navLinkContainerRef}>
            <StyledNavLink
              showLogout={showLogout}
              onClick={() => setShowLogout(!showLogout)}
            >
              <img
                alt="logo"
                src="https://img.freepik.com/free-icon/user_318-932533.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.2.1185902625.1677912760&semt=sph"
                height="25px"
              />
              <span className="offers-text">{userName}</span>
            </StyledNavLink>
            {showLogout && (
              <LogoutDiv onClick={handleLogout} ref={logoutDivRef}>
                Logout
              </LogoutDiv>
            )}
          </NavLinkContainer>
        )}

        <NavLink to="/cart">
          <img
            alt="logo"
            src="https://img.freepik.com/free-icon/shopping-cart-2_318-11553.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.2.1185902625.1677912760&semt=sph"
            height="25px"
          />{" "}
          <span className="offers-text">Cart</span>
        </NavLink>
      </Right>
    </Top>
  );
}

export default Header;

const StyledNavLink = styled(NavLink)`
  span {
    color: black;
    ${(props) =>
      props.showLogout &&
      css`
        color: #fc8019;
      `}
  }
`;
const LogoutDiv = styled.div`
  position: absolute;
  top: 70px;
  right: 140px;
  display: block;
  padding: 5px;
  background-color: #fc8019;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  padding: 15px;
`;

const NavLinkContainer = styled.div``;

const Top = styled.div`
  color: #fff;

  background-color: white;
  z-index: 999;
  height: 60px;
  display: flex;
  padding: 1vh;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.3);
  margin-bottom: 0px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2vh 2vw 2vh 0vh;

  input {
    border: none;
    border: 2px solid #ccc;
    padding: 1vh;
    margin-right: 1vw;
    font-size: 2vh;
    width: 10vw;
    height: 3vh;

    outline: none;
    @media (max-width: 600px) {
      display: none;
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
    &.active {
      color: #fc8019;
    }
    &:hover {
      color: #fc8019;
    }

    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    margin-left: 3.5vw;
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
  img {
    margin-left: 20px;
    cursor: pointer;
    aspect-ratio: 3/2;
    object-fit: contain;
    height: 2rem;

    /* mix-blend-mode:color-dodge; */
  }
`;
