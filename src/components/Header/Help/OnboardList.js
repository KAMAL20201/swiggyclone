import React, { useState } from 'react'
import styled from 'styled-components';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


function OnboardList({heading,content}) {

    const [showContent, setShowContent] = useState(false);
  return (
    <Container>
    <Content>
      <Head onClick={() => setShowContent(!showContent)}>
      <h4>{heading}</h4>
      {showContent ? < IoIosArrowUp  /> : < IoIosArrowDown/>}
      </Head>
      {showContent && <p>{content}</p>}
      </Content>
    </Container>
  )
}

export default OnboardList

const Container = styled.div`
    h4{
        cursor:pointer;
        font-weight:500;
        opacity:0.8;
    }
    h4:hover{
        color:#fc8019;
    }
    p{
        font-size:12px;
        margin-right:20px;
        opacity:0.7;
        line-height:20px;
    }
`

const Content = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
`

const Head = styled.div`
display:flex;
align-items:center;
justify-content:space-between;

svg{
    cursor:pointer;
    margin-right:10px;
}
`;