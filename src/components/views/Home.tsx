import React from "react";
import Header from "./Header";
import styled from "styled-components";

const StyledMainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const StyledSideBar = styled.div`
  width: 20vw;
  min-width: 200px;
  height: calc(100vh - 80px);
  margin-top: 79px;
  border: 1px solid black;
`;

const StyledMainContainerContainer = styled.div`
  width: 80vw;
  height: calc(100vh - 80px);
  margin-top: 79px;
  border: 1px solid red;
`;

function Home() {

  return (
    <>
      <Header />
      <StyledMainContainer>
        <StyledSideBar />
        <StyledMainContainerContainer />
      </StyledMainContainer>
    </>
  );
}

export default Home;