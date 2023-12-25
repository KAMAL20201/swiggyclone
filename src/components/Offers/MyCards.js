import React from 'react';
import styled from 'styled-components';
import RestauCard from '../Content/RestauCard';
function MyCards({ offers }) {
  return (
    <Container>
      {offers.slice(1).map((restaurant) => {
        return (
          <RestauCard key={restaurant.data.data.id} {...restaurant.data.data} />
        );
      })}
    </Container>
  );
}

export default MyCards;

const Container = styled.div`
  display: flex;
  flex-direction: row !important;
  flex-wrap: wrap;
  margin-left: 30px;
  > * {
    flex-grow: 0;
    flex-basis: calc(21%); /* Set the width of each card */
  }
`;
