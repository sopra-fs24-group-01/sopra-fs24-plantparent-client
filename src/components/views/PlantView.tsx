import React, { ReactElement, useEffect, useState } from "react";
import Header from "./Header";
import styled, { css } from "styled-components";
import { fetchPlantOfUser, selectAllPlants, selectPlantById } from "../../store/plantSlice";
import { useAppSelector } from "../../hooks";
import { selectLoggedInUser } from "../../store/userSlice";
import { store } from "../../store";
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
import { formatDistance, parseISO } from "date-fns";
import { careForPlant, waterPlant } from "service/plantService";
import PlantComponent from "./PlantComponent";
import { Modal } from "./PopupMsgComponent";

const StyledPrimaryButton = styled.button<{disabled?: boolean }>`
  color: #ffffff;
  font-size: 1.5rem;
  background-color: #83b271;
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin-left: 50px auto 5px auto;

  ${props => props.disabled && css`
    opacity: 0.5;`
  }
  
  &:hover {
    ${props => !props.disabled && css`
      cursor: pointer;
      scale: 0.95;`
    }
  }
`;

const ScheduleIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledMainContainer = styled.div`
  width: 60vw;
  height: fit-content;
  margin-top: 85px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
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

const StyledPlantTitle = styled.div`
  color: #83b271;
  font-size: 4rem;
  margin: 0 auto;
`;

const StyledDividerSmall = styled.hr`
  width: 100px;
  border-top: 3px solid #83b271;
  margin-left: auto;
`;

const StyledPlantDescription = styled.div`
  font-size: 1.5rem;
  margin-bottom: 15px;
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

const StyledCalendarTitle = styled.div`
  font-size: 3rem;
  margin: 15px auto;
  color: #000000;
`;

const StyledCaringContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;

const StyledIndividualCaringContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const StyledCaringImageContainer = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  width: fit-content;
  margin-right: 100px;
  margin-left: 25px;
`;

const StyledCaringTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledIndividualCaringText = styled.div`
  font-size: 1.5rem;
  margin-left: 10px;
`;

function Schedule({ plantId, text, date, svg, watering }: {
  plantId: number,
  text: string,
  date: string,
  svg: ReactElement,
  watering: boolean
}) {
  const [day, setDay] = useState(0);
  const [modal, setModal] = useState<boolean>(false);
  const past = isInThePast(date);
  const dateObject = parseISO(date);
  const now = new Date();

  useState(() => {
    setDay(calculateDifferenceInDays(date));
  });

  function action() {
    if (watering) {
      waterPlant(plantId).then();
      console.log("watering");
    } else {
      careForPlant(plantId).then();
      console.log("caring");
    }
    setModal(false);
  }

  return (
    <>
      {modal && <Modal setModal={setModal} action={action}
                       text={`Are you sure you ${watering ? "watered" : "cared for"} the plant?`} />}
      <StyledScheduleContainer>
        <StyledSchedule>
          {text}
        </StyledSchedule>
        <ScheduleIconsContainer>
          <CaringSVGContainer>
            {svg}
            <CaringDay $past={past}>{past ? "" : "+"}{day}</CaringDay>
          </CaringSVGContainer>
          <CaringSVGContainer $hover={true} onClick={() => setModal(true)}>
            {past ?
              <CheckFillSVG style={{ width: "40px", height: "40px", color: "#83b271" }} /> :
              <CheckSVG style={{ width: "40px", height: "40px", color: "#83b271" }} />}
          </CaringSVGContainer>
        </ScheduleIconsContainer>
      </StyledScheduleContainer>
    </>
  );
}

export default function PlantView() {
  // get the logged in user from the store
  const user = useAppSelector(selectLoggedInUser);
  // get the status of the plants from the store
  const plantStatus = useAppSelector(state => state.plants.status);
  
  // capture the plantId from the URL
  const { plantId } = useParams<{ plantId: string }>();
  // get the plant from the store
  const plant = useAppSelector(state => selectPlantById(state, Number(plantId)));

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
                        <Schedule plantId={plant.plantId} text={"Water"} date={plant.nextWateringDate}
                                  svg={<DropSVG style={{ color: "#00beff", width: "50px", height: "50px" }} />}
                                  watering={true} />
                      </StyledScheduleIconContainer>
                      <StyledScheduleIconContainer>
                        <Schedule plantId={plant.plantId} text={"Care"} date={plant.nextCaringDate}
                                  svg={<BandaidSVG style={{ color: "#ffaf00", width: "50px", height: "50px" }} />}
                                  watering={false} />
                      </StyledScheduleIconContainer>
                  </StyledScheduleIconsContainer>
              </StyledPlantProfileDetails>
            </StyledPlantProfileContainer>
          <StyledDividerSmall />
          <StyledPlantDescription>{plant.species}</StyledPlantDescription>
          <StyledDividerSmall />
          <StyledPlantDescription>{plant.careInstructions}</StyledPlantDescription>
          <StyledDividerSmall style={{ marginBottom: "auto" }} />
          <StyledCalendarTitle>Caring Schedule</StyledCalendarTitle>
          <StyledCaringContainer>
            <StyledIndividualCaringContainer>
              <StyledCaringImageContainer>
                <DropSVG style={{ color: "#00beff", width: "50px", height: "50px" }} />
              </StyledCaringImageContainer>
              <StyledCaringTextContainer>
                <StyledIndividualCaringText>Last Watering Date: {plant.lastWateringDate}</StyledIndividualCaringText>
                <StyledIndividualCaringText>Next Watering Date: {plant.nextWateringDate}</StyledIndividualCaringText>
                <StyledIndividualCaringText>Watering Interval: {plant.wateringInterval} Days</StyledIndividualCaringText>
              </StyledCaringTextContainer>
            </StyledIndividualCaringContainer>
            <StyledIndividualCaringContainer>
              <StyledCaringImageContainer>
                <BandaidSVG style={{ color: "#ffaf00", width: "50px", height: "50px" }} />
              </StyledCaringImageContainer>
              <StyledCaringTextContainer>
                <StyledIndividualCaringText>Last Caring Date: {plant.lastCaringDate}</StyledIndividualCaringText>
                <StyledIndividualCaringText>Next Caring Date: {plant.nextCaringDate}</StyledIndividualCaringText>
                <StyledIndividualCaringText>Caring Interval: {plant.caringInterval} Days</StyledIndividualCaringText>
              </StyledCaringTextContainer>
            </StyledIndividualCaringContainer>
          </StyledCaringContainer>
        </StyledMainContainer>
      }
    </>
  );
}