import React, { useEffect, useState } from "react";
import RestauCard from "./RestauCard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useOnline from "../../myHooks/useOnline";


function Content(props) {
  const { newRestaurantData, newInputData } = props;

  const [filterdata, setFilterData] = useState(newRestaurantData);
  const [clickedFilters, setClickedFilters] = useState([]);       



  useEffect(() => {
    const filteredData = newRestaurantData?.filter((restaurant) => {
      const nameMatch = restaurant.info.name
        .toLowerCase()
        .includes(newInputData.toLowerCase());
      const cuisineMatch = restaurant.info.cuisines.some((cuisine) => {
        return cuisine.toLowerCase().includes(newInputData.toLowerCase());
      });
      return nameMatch || cuisineMatch;
    });
    setFilterData(filteredData);
  }, [newRestaurantData, newInputData]);

  const filterRestaurants = (buttonId) => {
    let updatedFilters = [...clickedFilters];

    if (!updatedFilters.includes(buttonId)) {
      updatedFilters.push(buttonId);
    } else {
      updatedFilters = updatedFilters?.filter(
        (filterId) => filterId !== buttonId
      );
    }

    setClickedFilters(updatedFilters);

    let filteredData = newRestaurantData;

    if (updatedFilters.includes(1)) {
      filteredData = filteredData?.filter((restaurant) => {
        return restaurant.data.deliveryTime <= 35;
      });
    }

    if (updatedFilters.includes(2)) {
      filteredData = filteredData?.filter((restaurant) => {
        return parseFloat(restaurant.data.avgRating) >= 4;
      });
    }

    if (updatedFilters.includes(3)) {
      filteredData = filteredData?.filter((restaurant) => {
        return restaurant.data.pureVeg === true;
      });
    }
    if (updatedFilters.includes(4)) {
      filteredData = filteredData?.filter((restaurant) => {
        return (
          restaurant.data.costForTwoString / 100 >= 300 &&
          restaurant.data.costForTwoString / 100 <= 600
        );
      });
    }
    if (updatedFilters.includes(5)) {
      filteredData = filteredData?.filter((restaurant) => {
        return restaurant.data.costForTwoString / 100 <= 300;
      });
    }

    // Add more filters here for other buttons if needed

    setFilterData(filteredData);
  };

  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>No Internet Connection Found</h1>;
  }
  if (filterdata?.length === 0) return <h1>No Restaurant Found</h1>;
  return (
    <Container>
      <SortsFilter>
        <RestLength>{filterdata?.length} Restaurants</RestLength>
        <FilterContainer>
          <Filter>
            <button>Sort By</button>
            <button
              style={{
                background: clickedFilters.includes(1)
                  ? "#dad8d8"
                  : "transparent",
              }}
              onClick={() => filterRestaurants(1)}
            >
              Fast Delivery<span> X </span>
            </button>
            <button
              style={{
                background: clickedFilters.includes(2)
                  ? "#dad8d8"
                  : "transparent",
              }}
              onClick={() => filterRestaurants(2)}
            >
              Ratings 4.0+<span> X </span>
            </button>
            <button
              style={{
                background: clickedFilters.includes(3)
                  ? "#dad8d8"
                  : "transparent",
              }}
              onClick={() => filterRestaurants(3)}
            >
              Pure Veg<span> X </span>
            </button>
            <button
              style={{
                background: clickedFilters.includes(4)
                  ? "#dad8d8"
                  : "transparent",
              }}
              onClick={() => filterRestaurants(5)}
            >
              Rs.300-Rs.600<span> X </span>
            </button>
            <button
              style={{
                background: clickedFilters.includes(5)
                  ? "#dad8d8"
                  : "transparent",
              }}
              onClick={() => filterRestaurants(6)}
            >
              Less than Rs.300<span> X </span>
            </button>
          </Filter>
        </FilterContainer>
      </SortsFilter>

      <RestaurantCards>
        {filterdata?.map((restaurant) => {
          return (
            <Link
              to={"restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              <RestauCard {...restaurant.info} />
            </Link>
          );
        })}
      </RestaurantCards>

    </Container>
  );
}

export default Content;

const FilterContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  flex-grow: 1;

   /* Hide the scrollbar */
   scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  ::-webkit-scrollbar {
    display: none; /* Chrome and Safari */
  }
`;

const RestaurantCards = styled.div`
  display: grid;
    grid-template-columns: repeat(4, 1fr); /* Creates four equal columns */
      gap: 10px;


  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
   
  }
  @media (max-width: 450px) {
    grid-template-columns: repeat(1, 1fr);
   
  }

`;
const Filter = styled.div`
  display: flex;

  button {
    padding: 10px;
    margin: 10px;
    background: transparent;
    border-radius: 999px;
    border: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    font-size: 13px;

    cursor: pointer;
    @media (max-width: 450px) {
      font-size: 10px;
    }
  }
`;
const RestLength = styled.div`
  font-size: 3vw;
  padding: 10px;
  font-weight: 700;
`;
const SortsFilter = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex-wrap: wrap;
  overflow-x: hidden;
  margin-left: 30px;
  @media (max-width: 450px) {
    margin:0px;
  }
  a {
    width: 100%;
    display: flex;
    text-decoration: none;
    color: black;
    @media (max-width: 450px) {
      width: 100%;
    }
  }
`;
