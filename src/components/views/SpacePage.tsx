import React, { useEffect, useState } from "react";
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
import { ReactComponent as RemoveUserSVG } from "../../assets/person-fill-dash.svg";
import { ItemsSelectorComponent } from "./ItemSelectorComponent";
import { addUserToSpace, getAllUsers, getSpace, removeUserFromSpace } from "../../service/appService";
import { ItemsComponent } from "./ItemComponent";


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

const StyledPrimaryButtonSpace = styled(StyledPrimaryButton)`
  margin-top: 10px;
`;

const StyledSpacesPlantsContainer = styled.div`
  display: flex;
  height: 480px;
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

const StyledSelectorContainerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledSelectorContainer = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  border: 2px solid #83b271;
`;


function SpacePage() {
  const user = useAppSelector(selectLoggedInUser);
  const status = useAppSelector(getStatus);
  const { spaceId } = useParams<{ spaceId: string }>();
  const space = useAppSelector(state => selectSpaceById(state, Number(spaceId)));
  const plants: Plant[] = useAppSelector(state => selectAllSpacePlants(state, Number(spaceId)));
  const [showSelectUsers, setShowSelectUsers] = useState<boolean>(false);
  const [reloadUsers, setReloadUsers] = useState<boolean>(false);
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
            <StyledPrimaryButtonSpace
              disabled={false}
              onClick={() => navigate("/createPlant")}>Create new plant</StyledPrimaryButtonSpace>
            <StyledSelectorContainerContainer>
              <StyledSelectorContainer>
                <ItemsSelectorComponent
                  itemId={spaceId}
                  setShowSelectItems={setShowSelectUsers}
                  reloadItems={reloadUsers}
                  setReloadItems={setReloadUsers}
                  getPotentialItem={getSpace}
                  addItem={addUserToSpace}
                  getAllItems={getAllUsers}
                  fullItemKey={"spaceMembers"}
                  nameKey={"username"}
                  ignoreId={space.spaceOwner.id}
                  itemName={"user"} />
                <ItemsComponent
                  itemId={spaceId}
                  setShowSelectItems={setShowSelectUsers}
                  reloadItems={reloadUsers}
                  setReloadItems={setReloadUsers}
                  getPotentialItem={getSpace}
                  removeItem={removeUserFromSpace}
                  fullItemKey={"spaceMembers"}
                  nameKey={"username"}
                  ignoreId={space.spaceOwner.id}
                  itemTitle={"Space Members"}
                  itemName={"member"}
                  RemoveSVG={RemoveUserSVG}
                  edit={space.spaceOwner.id === user.id} />
              </StyledSelectorContainer>
              <StyledSelectorContainer>

              </StyledSelectorContainer>
            </StyledSelectorContainerContainer>
          </StyledMainContainerContainer>
        </StyledMainContainer>
      }
    </>
  );
}

export default SpacePage;