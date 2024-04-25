import React, { useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PlantComponent from "./PlantComponent";
import { StyledPrimaryButton } from "./Login";
import { useNavigate } from "react-router-dom";
import { getStatus, getUserDataById, loginUser, selectAllPlants, selectLoggedInUser } from "../../store/appSlice";


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
  display: flex;
  flex-direction: column;
`;

function Home() {
  const user = useAppSelector(selectLoggedInUser);
  const status = useAppSelector(getStatus);

  const plants: any[] = useAppSelector(selectAllPlants);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserDataById(user.id));
  }, [])

  return (
    <>
      <Header />
      {status === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
          <StyledSideBar />
          <StyledMainContainerContainer>
            {plants.length < 1 ? <div>You have no plants yet. Create one!</div> : plants.map(plant => (
              <PlantComponent key={plant.plantName} plant={plant} />
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