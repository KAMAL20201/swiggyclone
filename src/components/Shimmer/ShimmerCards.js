import React from 'react';
import styled from 'styled-components';
function ShimmerCards() {
  return (
    <>
      <Container>
        <Main />
        <FirstLine />
        <SecondLine />
      </Container>
    </>
  );
}

export default ShimmerCards;

const Container = styled.div`
  margin: 55px 20px 30px 70px;
  border-radius: 10px;
  display: flex;
  width: 17%;
  height: 220px;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    width: 20%;
    height: 200px;
  }
  @media (max-width: 900px) {
    width: 25%;
    height: 180px;
    margin: 55px 20px 30px 50px;
  }
  @media (max-width: 720px) {
    width: 22%;
    height: 180px;
    margin: 55px 20px 30px 50px;
  }
`;
const Main = styled.div`
  background-color: rgba(40, 44, 63, 0.05);
  width: 100%;
  height: 145px;
  margin-bottom: 3px;
`;
const FirstLine = styled.div`
  background-color: rgba(40, 44, 63, 0.05);
  height: 10px;
  width: 50%;
  margin-bottom: 2px;
`;
const SecondLine = styled.div`
  background-color: rgba(40, 44, 63, 0.05);
  height: 10px;
  width: 35%;
`;
