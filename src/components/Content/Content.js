import React, { useEffect, useState } from "react";
import RestauCard from "./RestauCard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useOnline from "../myHooks/useOnline";

function Content(props) {
  const {  newRestaurantData, newInputData } = props;

  const [filterdata, setFilterData] = useState(newRestaurantData);



  useEffect(() => {
    const filteredData = newRestaurantData.filter((restaurant) => {
      const nameMatch = restaurant.data.name
        .toLowerCase()
        .includes(newInputData.toLowerCase());
      const cuisineMatch = restaurant.data.cuisines.some((cuisine) => {
        return cuisine.toLowerCase().includes(newInputData.toLowerCase());
      });
      return nameMatch || cuisineMatch;
    });
    setFilterData(filteredData);
  }, [newRestaurantData, newInputData]);

  const isOnline=useOnline();
  if(!isOnline){
    return <h1>No Internet Connection Found</h1>
  }
  if (filterdata.length === 0) return <h1>No Restaurant Found</h1>;
  return (
    <Container>
    <SortsFilter>
    <RestLength>{newRestaurantData.length} Restaurants</RestLength>
    </SortsFilter>
    
      {filterdata.map((restaurant) => {
        return (
          <Link to={"restaurant/"+restaurant.data.id} key={restaurant.data.id}>
            <RestauCard  {...restaurant.data} />
          </Link>
        );
      })}
    </Container>
  );
}

export default Content;

const RestLength=styled.div`
font-size:24px;
padding:10px;
font-weight:700;

`
const SortsFilter=styled.div`
  display:flex;
  width:100%;
  height:50px;
`;


const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  margin-left: 30px;

 
  a{
    width:25%;
    display: flex;
    
    text-decoration: none;
    color: black;
  }
`;
