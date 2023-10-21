import React from "react";
import styled from "styled-components";
import ShimmerCards from "./ShimmerCards";
function ShimmerBody() {
  return (
    <ShimHead>
      {Array(10)
        .fill("")
        .map((e,index) => (
          <ShimmerCards key={index}/>
        ))}
    </ShimHead>
  );
}

export default ShimmerBody;

const ShimHead = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;



