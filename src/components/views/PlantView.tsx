import React, { ReactElement, useEffect, useState } from "react";
import Header from "./Header";
import styled, { css } from "styled-components";
import { fetchPlantOfUser, selectAllPlants, selectPlantById } from "../../store/plantSlice";
import { useAppSelector } from "../../hooks";
import { selectLoggedInUser } from "../../store/userSlice";
import { store } from "../../store";
import { StyledPrimaryButton } from "./Login";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDifferenceInDays, isInThePast } from "helpers/util";
import { Plant } from "types";
import { ReactComponent as HappyFaceSVG } from "../../assets/emoji-smile-fill.svg";
import { ReactComponent as NeutralFaceSVG } from "../../assets/emoji-neutral-fill.svg";
import { ReactComponent as AngryFaceSVG } from "../../assets/emoji-dizzy-fill.svg";
import { ReactComponent as DropSVG } from "../../assets/droplet-half.svg";
import { ReactComponent as BandaidSVG } from "../../assets/bandaid.svg";
import { ReactComponent as CheckSVG } from "../../assets/check-circle.svg";
import { ReactComponent as CheckFillSVG } from "../../assets/check-circle-fill.svg";
import { ReactComponent as ImagePlaceholderSVG } from "../../assets/image_placeholder.svg";
import { parseISO } from "date-fns";
import { careForPlant, waterPlant } from "service/plantService";
import PlantComponent from "./PlantComponent";



const StyledMainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

const StyledPlantProfileContainer = styled.div`
    width: 20vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const StyledPlantProfileHeader = styled.div`
    width: 20vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

const StyledPlantProfileDetails = styled.div`
    width: 20vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
`;

const StyledPlantImageContainer = styled.div`
    display: flex;
    justify-content: right;
    flex-direction: column;
    width: fit-content;
    margin-right: 25px;
`;

const StyledScheduleIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledScheduleIconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

const StyledMainContainerContainer = styled.div`
  width: 80vw;
  height: calc(100vh - 80px);
  margin-top: 79px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const StyledPlantComponentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 5px;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #83b271;
  height: 250px;
  position: relative;
`;

const StyledMoodContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const StyledPlantTitle = styled.div`
  color: #83b271;
  font-size: 2rem;
  margin: 0 auto;
`;

const StyledPlantMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  align-items: flex-start;
  height: 100%;
  width: 100%;
`;

const StyledDividerSmall = styled.hr`
  width: 100px;
  border-top: 3px solid #83b271;
  margin-left: 0;
`;

const StyledPlantDescription = styled.div`
  padding-right: 50px;
`;

const StyledScheduleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledSchedule = styled.div`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;


const CaringSVGContainer = styled.div<{ $hover?: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;

  &:hover {
    ${props => props.$hover && css`
      cursor: pointer;
      scale: 0.95;`
    }
  }
`;

const CaringDay = styled.div<{ $past: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  color: ${props => props.$past ? "red" : "green"};
  font-size: 1rem;
`;

const StyledGreenText = styled.span`
  color: #83b271;
  font-style: italic;
`;

export default function PlantView() {
  // get the logged in user from the store
  const user = useAppSelector(selectLoggedInUser);
  // get the status of the plants from the store
  const plantStatus = useAppSelector(state => state.plants.status);
  
  // capture the plantId from the URL
  const { plantId } = useParams<{ plantId: string }>();
  // get the plant from the store
  const plant = useAppSelector(state => selectPlantById(state, Number(plantId)));
  
  useEffect(() => {
    console.log(user);
    if (user !== null) {
      store.dispatch(fetchPlantOfUser(user.id));
    }
  }, [user]);

  const plants = useAppSelector(selectAllPlants);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      {plantStatus === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
            <StyledPlantProfileContainer>
                <StyledPlantProfileHeader>
                    <StyledPlantTitle>{plant.plantName}</StyledPlantTitle>
                    <StyledPrimaryButton onClick={() => navigate("/plants")}>Add Caretaker</StyledPrimaryButton>
                </StyledPlantProfileHeader>
                <StyledPlantProfileDetails>
                    <StyledPlantImageContainer>
                        <ImagePlaceholderSVG style={{ width: "200px", height: "200px" }} />
                    </StyledPlantImageContainer>
                    <StyledScheduleIconsContainer>
                        <StyledScheduleIconContainer>
                            <DropSVG style={{ width: "30px", height: "30px" }} />
                            <StyledSchedule>
                                <StyledGreenText>Next watering:</StyledGreenText> {plant.nextWateringDate}
                            </StyledSchedule>
                        </StyledScheduleIconContainer>
                        <StyledScheduleIconContainer>
                            <BandaidSVG style={{ width: "30px", height: "30px" }} />
                            <StyledSchedule>
                                <StyledGreenText>Next caring:</StyledGreenText> {plant.nextCaringDate}
                            </StyledSchedule>
                        </StyledScheduleIconContainer>
                    </StyledScheduleIconsContainer>
                </StyledPlantProfileDetails>
            </StyledPlantProfileContainer>
        </StyledMainContainer>
      }
    </>
  );
}