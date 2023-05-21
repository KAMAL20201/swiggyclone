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

// const Loader = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 250px;
//   background-color: black;
//   position: relative;

//   h2 {
//     position: absolute;
//     top: 100px;
//     left: 37%;
//     opacity: 0.65;
//     color: white;
//   }
//   .spinner {
//     position: absolute;
//     left: 50%;
//     top: 70px;
//     transform: translateX(-50%); // add this line
//     width: 22.4px;
//     height: 22.4px;
//   }

//   .spinner::before,
//   .spinner::after {
//     content: "";
//     width: 100%;
//     height: 100%;
//     display: block;
//     animation: spinner-b4c8mmmd 0.6s backwards,
//       spinner-49opz7md 1.5s 0.6s infinite ease;
//     border: 5.6px solid #474bff;
//     border-radius: 50%;
//     box-shadow: 0 -33.6px 0 -5.6px #474bff;
//     position: absolute;
//   }

//   .spinner::after {
//     animation-delay: 0s, 1.5s;
//   }

//   @keyframes spinner-b4c8mmmd {
//     from {
//       box-shadow: 0 0 0 -5.6px #474bff;
//     }
//   }

//   @keyframes spinner-49opz7md {
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `;
