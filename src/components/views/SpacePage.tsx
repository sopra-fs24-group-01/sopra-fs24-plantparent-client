import React, { useEffect } from "react";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PlantComponent from "./PlantComponent";
import { StyledPrimaryButton } from "./Login";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllPlantsSpace,
  getStatus, selectAllSpacePlants,
  selectLoggedInUser, selectSpaceById,
} from "../../store/appSlice";
import { StyledMainContainer, StyledMainContainerContainer } from "./Home";
import { Plant } from "../../types";
import { SpacesMenu } from "./SpacesMenu";
import styled from "styled-components";
import { ReactComponent as EditSVG } from "../../assets/pencil-square.svg";
import { ReactComponent as HouseSVG } from "../../assets/house-door.svg";
import { ReactComponent as KeySVG } from "../../assets/key.svg";


const StyledSpaceTitleContainer = styled.div`
  font-size: 2rem;
  color: #83b271;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 10px;
  
  svg {
    margin: auto 20px;
    width: 30px;
    height: 30px;
    color: #83b271;
  }
  
  svg:hover {
    cursor: pointer;
    color: #4f7343;
  }
`;

const StyledSpacesPlantsContainer = styled.div`
  display: flex;
  height: 520px;
  overflow-y: auto;
  flex-wrap: wrap;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;


function SpacePage() {
  const user = useAppSelector(selectLoggedInUser);
  const status = useAppSelector(getStatus);
  const { spaceId } = useParams<{ spaceId: string }>();
  const space = useAppSelector(state => selectSpaceById(state, Number(spaceId)));
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
            <StyledSpaceTitleContainer>
              {user.id === space.spaceOwner.id ? <HouseSVG /> : <KeySVG />}
              {space.spaceName}
              {space.spaceOwner.id === user.id && <EditSVG onClick={() => navigate(`/editSpace/${spaceId}`)} />}
            </StyledSpaceTitleContainer>
            <StyledSpacesPlantsContainer>
              {plants.length < 1 ? <div>You have no plants yet. Create one!</div> : plants.map(plant => (
                <PlantComponent key={plant.plantName} plantId={plant.plantId} userId={user.id} light={true}/>
              ))}
            </StyledSpacesPlantsContainer>
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