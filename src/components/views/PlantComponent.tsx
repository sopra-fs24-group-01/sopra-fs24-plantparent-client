import React, { ReactElement, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as ImagePlaceholderSVG } from "../../assets/image_placeholder.svg";
import { calculateDifferenceInDays, isInThePast } from "../../helpers/util";
import { ReactComponent as HappyFaceSVG } from "../../assets/emoji-smile-fill.svg";
import { ReactComponent as NeutralFaceSVG } from "../../assets/emoji-neutral-fill.svg";
import { ReactComponent as AngryFaceSVG } from "../../assets/emoji-dizzy-fill.svg";
import { ReactComponent as DropSVG } from "../../assets/droplet-half.svg";
import { ReactComponent as BandaidSVG } from "../../assets/bandaid.svg";
import { ReactComponent as CheckSVG } from "../../assets/check-circle.svg";
import { ReactComponent as HouseSVG } from "../../assets/house-door.svg";
import { ReactComponent as KeySVG } from "../../assets/key.svg";
import { ReactComponent as CheckFillSVG } from "../../assets/check-circle-fill.svg";
import { Modal } from "./PopupMsgComponent";
import { formatDistance, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { careForPlant, waterPlant } from "../../service/appService";
import { useAppSelector } from "../../hooks";
import { selectPlantById } from "../../store/appSlice";


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

const StyledPlantImageContainer = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  width: fit-content;
  margin: 15px 25px 5px 5px;
`;

const StyledMoodContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const StyledPlantTitle = styled.div<{$underline?: boolean}>`
  color: #83b271;
  font-size: 2rem;
  margin: 0 auto;
  ${props => (props.$underline) && css`
    text-decoration: underline;
  `};
  

  &:hover {
    ${props => (props.$underline) && css`
      cursor: pointer;
      color: #4f7343;
    `};
  }
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

export const ScheduleIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  font-size: 1.5rem;
`;

const StyledGreenText = styled.span`
  color: #83b271;
  font-style: italic;
`;

export const StyledOwnerContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
`;


export function Schedule({ plantId, userId, text, date, svg, watering, showText = true }: {
  plantId: number,
  userId: number,
  text: string,
  date: string,
  svg: ReactElement,
  watering: boolean,
  showText?: boolean
}) {
  const [day, setDay] = useState<string>("0");
  const [modal, setModal] = useState<boolean>(false);
  const past = isInThePast(date);
  const now = new Date();

  useState(() => {
    setDay(calculateDifferenceInDays(date));
  });

  function action() {
    if (watering) {
      waterPlant(plantId).then(() => window.location.reload());
    } else {
      careForPlant(plantId).then(() => window.location.reload());
    }
    setModal(false);
  }

  return (
    <>
      {modal && <Modal setModal={setModal} action={action}
        text={`Are you sure you ${watering ? "watered" : "cared for"} the plant?`} />}
      <StyledScheduleContainer>
        {showText &&
          <StyledSchedule>
            {text} <StyledGreenText title={date}>{formatDistance(date, now, { addSuffix: true })}</StyledGreenText>
          </StyledSchedule>
        }
        <ScheduleIconsContainer>
          <CaringSVGContainer>
            {svg}
            <CaringDay $past={past}>{day}</CaringDay>
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

export default function PlantComponent({ plantId, userId }: { plantId: number, userId: number }) {
  const plant = useAppSelector(state => selectPlantById(state, plantId));
  const navigate = useNavigate();
  let mood = "happy";
  // next watering date or next caring date in the past
  if ((isInThePast(plant.nextWateringDate) && !isInThePast(plant.nextCaringDate)) ||
    (!isInThePast(plant.nextWateringDate) && isInThePast(plant.nextCaringDate))) {
    mood = "neutral";
  }
  // next watering date and next caring date in the past
  if (isInThePast(plant.nextWateringDate) && isInThePast(plant.nextCaringDate)) {
    mood = "angry";
  }

  return (
    <StyledPlantComponentContainer>
      <StyledMoodContainer>
        {mood === "happy" && <HappyFaceSVG style={{ color: "#83b271", width: "50px", height: "50px" }} />}
        {mood === "neutral" && <NeutralFaceSVG style={{ color: "orange", width: "50px", height: "50px" }} />}
        {mood === "angry" && <AngryFaceSVG style={{ color: "red", width: "50px", height: "50px" }} />}
      </StyledMoodContainer>
      <StyledOwnerContainer title={userId === plant.owner.id ? "My plant" : "Cared for plant"}>
        {userId === plant.owner.id && <HouseSVG style={{ color: "#83b271", width: "35px", height: "35px" }} />}
        {userId !== plant.owner.id && <KeySVG style={{ color: "#83b271", width: "40px", height: "40px" }} />}
      </StyledOwnerContainer>
      <StyledPlantImageContainer>
        {!plant.plantImageUrl &&
          <ImagePlaceholderSVG style={{ width: "200px", height: "200px" }} />}
        {plant.plantImageUrl &&
          <img src={plant.plantImageUrl} style={{ width: "200px", height: "200px" }} />}
        <StyledPlantTitle $underline={true} onClick={() => navigate("/plant/" + plant.plantId)}>{plant.plantName}</StyledPlantTitle>
      </StyledPlantImageContainer>
      <StyledPlantMainInfo>
        <StyledPlantDescription>{plant.species}</StyledPlantDescription>
        <StyledDividerSmall />
        {plant.careInstructions}
        <StyledDividerSmall style={{ marginBottom: "auto" }} />
        <Schedule plantId={plant.plantId} userId={userId} text={"Next watering date:"} date={plant.nextWateringDate}
          svg={<DropSVG style={{ color: "#00beff", width: "50px", height: "50px" }} />}
          watering={true} />
        <Schedule plantId={plant.plantId} userId={userId} text={"Next caring date:"} date={plant.nextCaringDate}
          svg={<BandaidSVG style={{ color: "#ffaf00", width: "50px", height: "50px" }} />}
          watering={false} />
      </StyledPlantMainInfo>
    </StyledPlantComponentContainer>
  );
}