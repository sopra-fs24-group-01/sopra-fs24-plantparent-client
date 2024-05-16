import React, { useEffect } from "react";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PlantComponent from "./PlantComponent";
import { StyledPrimaryButton } from "./Login";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllPlantsSpace,
  getStatus, selectAllSpacePlants,
  selectLoggedInUser,
} from "../../store/appSlice";
import { StyledMainContainer, StyledMainContainerContainer } from "./Home";
import { Plant } from "../../types";
import { SpacesMenu } from "./SpacesMenu";


function SpacePage() {
  const user = useAppSelector(selectLoggedInUser);
  const status = useAppSelector(getStatus);
  const { spaceId } = useParams<{ spaceId: string }>();
  const plants: Plant[] = useAppSelector(state => selectAllSpacePlants(state, Number(spaceId)));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getPlants();
    const timeoutId = setInterval(getPlants, 5000);

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  function getPlants() {
    dispatch(getAllPlantsSpace(Number(spaceId)));
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

export default SpacePage;