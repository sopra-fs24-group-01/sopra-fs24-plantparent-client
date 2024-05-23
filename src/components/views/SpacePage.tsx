import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import PlantComponent from "./PlantComponent";
import { StyledPrimaryButton } from "./Login";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllPlantsSpace,
  getStatus, selectAllSpacePlants,
  selectLoggedInUser, selectPlantsOfSelectedSpace, selectSpaceById, updateGetAllPlantsOwned,
} from "../../store/appSlice";
import { StyledMainContainer, StyledMainContainerContainer } from "./Home";
import { Plant } from "../../types";
import { SpacesMenu } from "./SpacesMenu";
import styled from "styled-components";
import { ReactComponent as EditSVG } from "../../assets/pencil-square.svg";
import { ReactComponent as HouseSVG } from "../../assets/house-door.svg";
import { ReactComponent as KeySVG } from "../../assets/key.svg";
import { ReactComponent as RemoveUserSVG } from "../../assets/person-fill-dash.svg";
import { ReactComponent as AddUserSVG } from "../../assets/person-add.svg";
import { ReactComponent as AddPlantSVG } from "../../assets/plant-add.svg";
import { ReactComponent as RemovePlantSVG } from "../../assets/plant-remove.svg";
import { ItemsSelectorComponent } from "./ItemSelectorComponent";
import {
  addPlantToSpace,
  addUserToSpace, deleteSpace,
  getAllPlantsOwned,
  getAllUsers,
  getSpace, removePlantFromSpace,
  removeUserFromSpace,
} from "../../service/appService";
import { ItemsComponent } from "./ItemComponent";
import { Modal, StyledModalButtonRed } from "./PopupMsgComponent";


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
  flex-grow: 1;
`;

const StyledSelectorContainer = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 20px;
  border: 2px solid #83b271;
`;

export const StyledAddItemContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  color: #83b271;

  &:hover {
    cursor: pointer;
    color: #4f7343;
  }
`;

const StyledDeleteButtonContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;


export default React.memo(function SpacePage() {
  const user = useAppSelector(selectLoggedInUser);
  const status = useAppSelector(getStatus);
  const { spaceId } = useParams<{ spaceId: string }>();
  const space = useAppSelector(state => selectSpaceById(state, Number(spaceId)));
  const plants: Plant[] = useAppSelector(selectPlantsOfSelectedSpace);
  const [showSelectUsers, setShowSelectUsers] = useState<boolean>(false);
  const [reloadUsers, setReloadUsers] = useState<boolean>(false);
  const [showSelectPlants, setShowSelectPlants] = useState<boolean>(false);
  const [reloadPlants, setReloadPlants] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getPlants();
    const timeoutId = setInterval(getPlants, 5000);

    return () => {
      clearInterval(timeoutId);
    };
  }, [spaceId]);

  useEffect(() => {
    getPlants()
  }, [space])

  function setDoubleReloadPlants(condition: boolean) {
    getPlants();
    setReloadPlants(condition);
  }

  function getPlants() {
    dispatch(getAllPlantsSpace(Number(spaceId)));
    dispatch(updateGetAllPlantsOwned(user.id));
    setReloadPlants(true);
    setReloadUsers(true);
  }

  async function getAllPlants() {
    const allPlantsOwned = await getAllPlantsOwned(user.id);

    return allPlantsOwned.filter((plant: any) => plant.space === null);
  }

  async function confirmDelete() {
    setModal(false);
    await deleteSpace(Number(spaceId)).then(() => navigate("/"));
  }

  return (
    <>
      {modal && <Modal setModal={setModal} action={confirmDelete}
        text={"Are you sure you want to delete the space?"} />}
      <Header />
      {status === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
          <SpacesMenu />
          <StyledMainContainerContainer>
            <StyledSpaceTitleContainer>
              {user.id === space.spaceOwner.id ? <HouseSVG /> : <KeySVG />}
              {space.spaceName}
              {space.spaceOwner.id === user.id && <EditSVG onClick={() => navigate(`/editSpace/${spaceId}`)} />}
              {space.spaceOwner.id === user.id &&
                <StyledDeleteButtonContainer>
                  <StyledModalButtonRed $small={true} onClick={() => setModal(true)}>Delete Space</StyledModalButtonRed>
                </StyledDeleteButtonContainer>}
            </StyledSpaceTitleContainer>
            <StyledSpacesPlantsContainer>
              {plants.length < 1 ? <div>You have no plants yet. Create one!</div> : plants.map(plant => (
                <PlantComponent key={plant.plantName} plantId={plant.plantId} userId={user.id} light={true}/>
              ))}
            </StyledSpacesPlantsContainer>
            <StyledPrimaryButtonSpace
              disabled={false}
              onClick={() => navigate("/createPlant/" + space.spaceId)}>Create new plant</StyledPrimaryButtonSpace>
            <StyledSelectorContainerContainer>
              <StyledSelectorContainer>
                {user.id === space.spaceOwner.id &&
                  <StyledAddItemContainer>
                    <AddUserSVG onClick={() => setShowSelectUsers(!showSelectUsers)}
                      style={{ width: "50px", height: "50px", margin: "auto" }} />
                  </StyledAddItemContainer>}
                {showSelectUsers &&
                <ItemsSelectorComponent
                  itemId={spaceId}
                  setShowSelectItems={setShowSelectUsers}
                  reloadItems={reloadUsers}
                  setReloadItems={setReloadUsers}
                  getPotentialItem={getSpace}
                  addItem={addUserToSpace}
                  getAllItems={getAllUsers}
                  fullItemKey={"spaceMembers"}
                  idKey={"id"}
                  nameKey={"username"}
                  ignoreId={space.spaceOwner.id}
                  itemName={"user"}
                  AddSVG={AddUserSVG}
                  tooltip={"Add a user to space"}
                  right={true}
                  top={true}/>}
                <ItemsComponent
                  itemId={spaceId}
                  setShowSelectItems={setShowSelectUsers}
                  reloadItems={reloadUsers}
                  setReloadItems={setReloadUsers}
                  getPotentialItem={getSpace}
                  removeItem={removeUserFromSpace}
                  fullItemKey={"spaceMembers"}
                  idKey={"id"}
                  nameKey={"username"}
                  ignoreId={space.spaceOwner.id}
                  itemTitle={"Space Members"}
                  itemName={"member"}
                  RemoveSVG={RemoveUserSVG}
                  edit={space.spaceOwner.id === user.id} />
              </StyledSelectorContainer>
              <StyledSelectorContainer>
                {user.id === space.spaceOwner.id &&
                  <StyledAddItemContainer>
                    <AddPlantSVG onClick={() => setShowSelectPlants(!showSelectPlants)}
                      style={{ width: "50px", height: "50px", margin: "auto" }} />
                  </StyledAddItemContainer>}
                {showSelectPlants &&
                  <ItemsSelectorComponent
                    itemId={spaceId}
                    setShowSelectItems={setShowSelectPlants}
                    reloadItems={reloadPlants}
                    setReloadItems={setDoubleReloadPlants}
                    getPotentialItem={getSpace}
                    addItem={addPlantToSpace}
                    getAllItems={getAllPlants}
                    fullItemKey={"plantsContained"}
                    idKey={"plantId"}
                    nameKey={"plantName"}
                    ignoreId={99999999999999999999999999}
                    itemName={"plant"}
                    AddSVG={AddPlantSVG}
                    tooltip={"Add a plant to space"}
                    right={true}
                    top={true}/>}
                <ItemsComponent
                  itemId={spaceId}
                  setShowSelectItems={setShowSelectPlants}
                  reloadItems={reloadPlants}
                  setReloadItems={setDoubleReloadPlants}
                  getPotentialItem={getSpace}
                  removeItem={removePlantFromSpace}
                  fullItemKey={"plantsContained"}
                  idKey={"plantId"}
                  nameKey={"plantName"}
                  ignoreId={99999999999999999999999999}
                  itemTitle={"Plants"}
                  itemName={"plant"}
                  RemoveSVG={RemovePlantSVG}
                  edit={space.spaceOwner.id === user.id} />

              </StyledSelectorContainer>
            </StyledSelectorContainerContainer>
          </StyledMainContainerContainer>
        </StyledMainContainer>
      }
    </>
  );
})