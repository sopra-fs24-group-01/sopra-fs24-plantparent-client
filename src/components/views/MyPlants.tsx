import React, { useEffect } from "react";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PlantComponent from "./PlantComponent";
import { StyledPrimaryButton } from "./Login";
import { useNavigate } from "react-router-dom";
import {
  getStatus,
  selectLoggedInUser,
  selectOwnedPlants, updateGetAllPlantsOwned,
} from "../../store/appSlice";
import { StyledMainContainer, StyledMainContainerContainer, StyledSideBar } from "./Home";
import { Plant } from "../../types";


function MyPlants() {
  const user = useAppSelector(selectLoggedInUser);
  const status = useAppSelector(getStatus);

  const plants: Plant[] = useAppSelector(selectOwnedPlants);
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
    dispatch(updateGetAllPlantsOwned(user.id));
  }

  return (
    <>
      <Header />
      {status === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
          <StyledSideBar />
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

export default MyPlants;