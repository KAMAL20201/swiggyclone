import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";

function Header(props) {
  const [query, setQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  function handleInputChange(event) {
    const query = event.target.value.toLowerCase();
    setQuery(query);
    props.getInputData(query);
  }


  return (
    <Top>
      <Logo>
        <Link to="/">
          <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAhezojWn_3WE-Wvw_MOtFKigLVuHYxjxBQw&usqp=CAU" width="40px" height="60px" alt="logo" />
        </Link>
      </Logo>

      <Right>
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
        
        <Link to="/offers" >
          <img
            alt="logo"
            src="https://img.freepik.com/free-icon/discount_318-902372.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.1.1185902625.1677912760&semt=sph"
            height="25px"
          />
          <span className="offers-text">Offers</span>
        </Link>
        
        <Link to="/help">
          <img
            alt="logo"
            src="https://img.freepik.com/free-icon/question_318-933114.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.1.1185902625.1677912760&semt=sph"
            height="25px"
          />{" "}
          <span className="offers-text">Help</span>
        </Link>
      
        <Link to="/signin">
          <img
            alt="logo"
            src="https://img.freepik.com/free-icon/user_318-932533.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.2.1185902625.1677912760&semt=sph"
            height="25px"
          />
          <span className="offers-text">Sign In</span>
        </Link>
        
        <Link to="/cart">
          <img
            alt="logo"
            src="https://img.freepik.com/free-icon/shopping-cart-2_318-11553.jpg?size=338&ext=jpg&uid=R15594633&ga=GA1.2.1185902625.1677912760&semt=sph"
            height="25px"
          />{" "}
          <span className="offers-text">Cart</span>
        </Link>
     
      </Right>
    </Top>
  );
}

export default Header;

const Top = styled.div`
  color: #fff;
  background-color:#fff;
  height: 80px;
  display: flex;
  padding: 5px;
  box-shadow: 0 0px 14px rgba(0, 0, 0, 0.3);
  margin-bottom: 0px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Right=styled.div`
 display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px 10px 0px;
  input {
    border: none;
    border: 2px solid #ccc;
    padding: 5px;
    margin-right: 10px;
    font-size: 16px;
    outline: none;
  }
  img {
    margin-right: 10px;
    cursor: pointer;
  }
  
  a {
   
    &:hover{
      color: orange;
      
    }
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 16px;
    margin-left: 35px;
    cursor: pointer;
  }
  .offers-text {
    margin-right: 5px;
    font-weight:600;
  }
`;


const Logo = styled.div`
  img {
    margin-left:20px;
  }
`;


