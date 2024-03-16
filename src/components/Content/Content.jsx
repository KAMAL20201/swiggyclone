import React, { useEffect, useState } from 'react';
import RestauCard from './RestauCard';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useOnline from '../../myHooks/useOnline';
import { useSearchRestaurantContext } from '../../contexts/searchResturantContext';
import { RESTAURANT_FILTERS } from '../../utils/utils';
import { IoClose } from 'react-icons/io5';
import classes from './style.module.css';
import clsx from 'clsx';

function Content(props) {
  const { newRestaurantData } = props;

  const [filterdata, setFilterData] = useState(newRestaurantData);
  const [currentFilters, setCurrentFilters] = useState([]);
  const { query: newInputData } = useSearchRestaurantContext();

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

  const filterCategories = [
    RESTAURANT_FILTERS.FAST_DELIVERY,
    RESTAURANT_FILTERS.RATING_FOUR_PLUS,
    RESTAURANT_FILTERS.PURE_VEG,
    RESTAURANT_FILTERS.THREE_TO_SIX_HUNDRED,
    RESTAURANT_FILTERS.LESS_THAN_THREE_HUNDRED,
  ];

  const addFilterHandler = (filter) => {
    //if it's already present

    if (currentFilters.length > 0 && currentFilters.includes(filter)) {
      setCurrentFilters((prev) => {
        return prev?.filter((el) => {
          return el !== filter;
        });
      });
    } else {
      setCurrentFilters((prev) => [...prev, filter]);
    }
  };

  const sortedFilterData = () => {
    let filteredData = newRestaurantData;

    currentFilters.length > 0 &&
      currentFilters.map((filter) => {
        switch (filter) {
          case RESTAURANT_FILTERS.FAST_DELIVERY:
            filteredData = filteredData?.filter((restaurant) => {
              return restaurant?.info?.sla?.deliveryTime <= 35;
            });
            break;
          case RESTAURANT_FILTERS.RATING_FOUR_PLUS:
            filteredData = filteredData?.filter((restaurant) => {
              return parseFloat(restaurant?.info?.avgRating) >= 4;
            });
            break;
          case RESTAURANT_FILTERS.PURE_VEG:
            filteredData = filteredData?.filter((restaurant) => {
              return restaurant?.data?.veg === true;
            });
            break;
          case RESTAURANT_FILTERS.THREE_TO_SIX_HUNDRED:
            filteredData = filteredData?.filter((restaurant) => {
              let costForTwo = restaurant?.info?.costForTwo
                ?.split(' ')[0]
                .slice(1);
              costForTwo = parseInt(costForTwo);

              return costForTwo >= 300 && costForTwo <= 600;
            });
            break;
          case RESTAURANT_FILTERS.LESS_THAN_THREE_HUNDRED:
            filteredData = filteredData?.filter((restaurant) => {
              let costForTwo = restaurant?.info?.costForTwo
                ?.split(' ')[0]
                .slice(1);
              costForTwo = parseInt(costForTwo);

              return costForTwo < 300;
            });
            break;
        }
      });

    setFilterData(filteredData);
  };

  useEffect(() => {
    sortedFilterData();
  }, [currentFilters]);

  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>No Internet Connection Found</h1>;
  }
  if (filterdata?.length === 0 && newInputData.length > 0)
    return <h1>No Restaurant Found</h1>;
  return (
    <Container>
      <SortsFilter>
        <RestLength>{filterdata?.length} Restaurants</RestLength>
        <FilterContainer>
          <Filter>
            <button className={classes.filterBtn}>
              {' '}
              <p className={classes.filterText}>Sort By</p>
            </button>
            {filterCategories.map((filter, index) => {
              return (
                <button
                  key={index}
                  className={clsx(
                    classes.filterBtn,
                    currentFilters.includes(filter) && classes.filterBtnActive
                  )}
                  onClick={() => addFilterHandler(filter)}
                >
                  <p className={classes.filterText}>{filter}</p>
                  <IoClose />
                </button>
              );
            })}
          </Filter>
        </FilterContainer>
      </SortsFilter>

      <RestaurantCards>
        {filterdata?.map((restaurant) => {
          return (
            <Link
              to={'restaurant/' + restaurant.info.id}
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
  gap: 10px;
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
  margin-top: 20px;
  @media (max-width: 450px) {
    margin: 0px;
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
