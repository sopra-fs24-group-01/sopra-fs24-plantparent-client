import React, { useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import { fetchPlantOfUser, selectAllPlants } from "../../store/plantSlice";
import { useAppSelector } from "../../hooks";
import PlantComponent from "./PlantComponent";
import { selectLoggedInUser } from "../../store/userSlice";
import { store } from "../../store";


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
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const plantsStatus = useAppSelector(state => state.plants.status);
  useEffect(() => {
    console.log(loggedInUser);
    if (loggedInUser !== null) {
      store.dispatch(fetchPlantOfUser(loggedInUser.id));
    }
  }, [loggedInUser]);

  const plants = useAppSelector(selectAllPlants);
  return (
    <>
      <Header />
      {plantsStatus === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
          <StyledSideBar />
          <StyledMainContainerContainer>
            {plants.map(plant => (
              <PlantComponent key={plant.plantName} plant={plant} />
            ))}
          </StyledMainContainerContainer>
        </StyledMainContainer>
      }
    </>
  );
}

export default Home;