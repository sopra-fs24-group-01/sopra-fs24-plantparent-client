import React from "react";
import Header from "./Header";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as DropSVG } from "../../assets/droplet-half.svg";
import { ReactComponent as BandaidSVG } from "../../assets/bandaid.svg";
import { ReactComponent as ImagePlaceholderSVG } from "../../assets/image_placeholder.svg";
import { getStatus, selectLoggedInUser, selectPlantById } from "../../store/appSlice";
import { StyledPrimaryButton } from "./Login";
import { Schedule, StyledPlantTitle } from "./PlantComponent";
import { formatDate } from "../../helpers/util";
import { ReactComponent as EditPlantSVG } from "../../assets/pencil-square.svg";


const StyledMainContainer = styled.div`
  position: relative;
  width: 60vw;
  min-width: 750px;
  height: fit-content;
  margin-top: 85px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 2px solid #83b271;
  border-radius: 5px;
`;

const StyledPlantProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPlantProfileHeader = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledPlantProfileDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledPlantImageContainer = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  width: fit-content;
  margin-right: 25px;
  margin-left: 25px;
`;

const StyledScheduleIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledScheduleIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const StyledDividerSmall = styled.hr`
  width: 100px;
  border-top: 3px solid #83b271;
  margin-left: auto;
`;

const StyledPlantDescription = styled.div`
  font-size: 1.5rem;
  margin-bottom: 15px;
  text-align: center;
`;
const StyledSmallText = styled.div`
  font-size: 1rem;
  margin: 5px;
`;


const StyledCalendarTitle = styled.div`
  font-size: 2.5rem;
  margin: 25px auto;
  color: #000000;
  position: relative;
`;

const StyledCaringContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-start;
`;

const StyledIndividualCaringContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  justify-content: center;
  width: 100%;
`;

const StyledCaringImageContainer = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  width: fit-content;
  margin-right: 25px;
`;

const StyledCaringTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledIndividualCaringText = styled.div`
  font-size: 1.5rem;
  margin-left: 10px;
  text-align: center;
`;


const StyledEditPlantContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 8px;
  color: #83b271;

  &:hover {
    cursor: pointer;
    color: #4f7343;
  }
`;

const StyledEditScheduleContainer = styled.span`
  color: #83b271;
  margin-left: 15px;

  &:hover {
    cursor: pointer;
    color: #4f7343;
  }
`;


export default function PlantView() {
  // get the logged in user from the store
  const user = useAppSelector(selectLoggedInUser);
  // get the status of the plants from the store
  const appStatus = useAppSelector(getStatus);
  
  // capture the plantId from the URL
  const { plantId } = useParams<{ plantId: string }>();
  // get the plant from the store
  const plant = useAppSelector(state => selectPlantById(state, Number(plantId)));

  const navigate = useNavigate();
  return (
    <>
      <Header />
      {appStatus === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
          <StyledEditPlantContainer onClick={() => navigate("/editPlant/" + plant.plantId)}>
            <EditPlantSVG style={{ width: "35px", height: "35px" }} />
          </StyledEditPlantContainer>
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
                        <Schedule plantId={plant.plantId} text={"Water"} date={plant.nextWateringDate}
                                  svg={<DropSVG style={{ color: "#00beff", width: "50px", height: "50px" }} />}
                                  watering={true} showText={false}/>
                      </StyledScheduleIconContainer>
                      <StyledScheduleIconContainer>
                        <Schedule plantId={plant.plantId} text={"Care"} date={plant.nextCaringDate}
                                  svg={<BandaidSVG style={{ color: "#ffaf00", width: "50px", height: "50px" }} />}
                                  watering={false} showText={false}/>
                      </StyledScheduleIconContainer>
                  </StyledScheduleIconsContainer>
              </StyledPlantProfileDetails>
            </StyledPlantProfileContainer>
          <StyledDividerSmall />
          <StyledPlantDescription><StyledSmallText>Plant info:</StyledSmallText> {plant.species}</StyledPlantDescription>
          <StyledDividerSmall />
          <StyledPlantDescription><StyledSmallText>Care instructions:</StyledSmallText>{plant.careInstructions}</StyledPlantDescription>
          <StyledDividerSmall style={{ marginBottom: "auto" }} />
          <StyledCalendarTitle>Caring Schedule
            <StyledEditScheduleContainer onClick={() => navigate("/editSchedule/" + plant.plantId)}>
              <EditPlantSVG style={{ width: "30px", height: "30px", marginTop: "5px" }} />
            </StyledEditScheduleContainer>
          </StyledCalendarTitle>
          <StyledCaringContainer>
            <StyledIndividualCaringContainer>
              <StyledCaringImageContainer>
                <DropSVG style={{ color: "#00beff", width: "50px", height: "50px", margin: 'auto' }} />
              </StyledCaringImageContainer>
              <StyledCaringTextContainer>
                <StyledIndividualCaringText><StyledSmallText>Last Watering Date:</StyledSmallText> {formatDate(plant.lastWateringDate)}</StyledIndividualCaringText>
                <StyledIndividualCaringText><StyledSmallText>Next Watering Date:</StyledSmallText> {formatDate(plant.nextWateringDate)}</StyledIndividualCaringText>
                <StyledIndividualCaringText><StyledSmallText>Watering Interval:</StyledSmallText> every {plant.wateringInterval} day(s)</StyledIndividualCaringText>
              </StyledCaringTextContainer>
            </StyledIndividualCaringContainer>
            <StyledIndividualCaringContainer>
              <StyledCaringImageContainer>
                <BandaidSVG style={{ color: "#ffaf00", width: "50px", height: "50px", margin: 'auto' }} />
              </StyledCaringImageContainer>
              <StyledCaringTextContainer>
                <StyledIndividualCaringText><StyledSmallText>Last Caring Date:</StyledSmallText> {formatDate(plant.lastCaringDate)}</StyledIndividualCaringText>
                <StyledIndividualCaringText><StyledSmallText>Next Caring Date:</StyledSmallText> {formatDate(plant.nextCaringDate)}</StyledIndividualCaringText>
                <StyledIndividualCaringText><StyledSmallText>Caring Interval:</StyledSmallText> every {plant.caringInterval} day(s)</StyledIndividualCaringText>
              </StyledCaringTextContainer>
            </StyledIndividualCaringContainer>
          </StyledCaringContainer>
        </StyledMainContainer>
      }
    </>
  );
}