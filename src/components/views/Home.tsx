import React, { useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PlantComponent from "./PlantComponent";
import { StyledPrimaryButton } from "./Login";
import { useNavigate } from "react-router-dom";
import {
  getStatus,
  selectAllPlants,
  selectLoggedInUser, updateGetAllPlantsCaredFor,
  updateGetAllPlantsOwned,
} from "../../store/appSlice";
import { Plant } from "../../types";
import { SpacesMenu } from "./SpacesMenu";


export const StyledMainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const StyledMainContainerContainer = styled.div`
  width: 80vw;
  height: calc(100vh - 80px);
  margin-top: 79px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

function Home() {
  const plants: Plant[] = useAppSelector(selectAllPlants);
  const user = useAppSelector(selectLoggedInUser);
  const status = useAppSelector(getStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getPlants();
    const timeoutId = setInterval(getPlants, 5000);

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  function getPlants() {
    dispatch(updateGetAllPlantsOwned(user.id));
    dispatch(updateGetAllPlantsCaredFor(user.id));
  }

  return (
    <>
      <Header />
      {status === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
          <SpacesMenu />
          <StyledMainContainerContainer>
            {plants.length < 1 ? <div>You have no plants yet. Create one!</div> : plants.map(plant => (
              <PlantComponent key={plant.plantName} plantId={plant.plantId} userId={user.id} />
            ))}
            <StyledPrimaryButton
              disabled={false}
              onClick={() => navigate("/createPlant")}>Create new plant</StyledPrimaryButton>
          </StyledMainContainerContainer>
        </StyledMainContainer>
      }
    </>
  );
}

export default Home;