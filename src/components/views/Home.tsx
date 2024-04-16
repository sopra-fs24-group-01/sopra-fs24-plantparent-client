import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { store } from "../../store";
import { fetchPlants, selectAllPlants } from "../../store/plantSlice";
import { useAppSelector } from "../../hooks";
import PlantComponent from "./PlantComponent";

store.dispatch(fetchPlants());

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
  overflow-y: auto;
`;

function Home() {
  const plants = useAppSelector(selectAllPlants);
  return (
    <>
      <Header />
      <StyledMainContainer>
        <StyledSideBar />
        <StyledMainContainerContainer>
          {plants.map(plant => (
            <PlantComponent key={plant.plantName} plant={plant}/>
          ))}
        </StyledMainContainerContainer>
      </StyledMainContainer>
    </>
  );
}

export default Home;