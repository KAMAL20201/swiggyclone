import React, { useEffect, useState } from 'react';
import OffersCard from './OffersCard';
import styled from 'styled-components';
function NewOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getOffers();
  }, []);

  async function getOffers() {
    const data = await fetch(
      'https://www.swiggy.com/dapi/offers/payment?lat=30.7333148&lng=76.7794179&offset=',
    );
    const json = await data.json();

    setOffers(json?.data?.cards);
  }

  return (
    <Container>
      {offers.map((offer) => {
        if (offer.data.data.logo) {
          return <OffersCard {...offer.data} />;
        } else {
          return null;
        }
      })}
    </Container>
  );
}

export default NewOffers;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
`;
