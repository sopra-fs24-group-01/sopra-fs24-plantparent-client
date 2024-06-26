import React, { ReactElement, useEffect, useState } from "react";
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
import { formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";
import { careForPlant, waterPlant } from "../../service/appService";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getPlantCaredFor,
  getPlantWatered, resetPlantCaredFor,
  resetPlantWatered, selectColorById,
  selectPlantById,
  updatePlantInPlantStore,
} from "../../store/appSlice";
import { RainAnimation } from "./RainAnimationComponent";
import { CaringAnimation } from "./CaringAnimationComponent";


const StyledPlantComponentContainer = styled.div<{ color: string, $light?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 5px;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #83b271;
  height: 250px;
  position: relative;
  background-color: ${props => props.color};

  ${props => props.$light && css`
    width: calc(50% - 50px);
  `};

  &:hover {
    border-width: 3px;
  }
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

export const StyledPlantTitle = styled.div<{ $underline?: boolean }>`
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

const StyledPlantMainInfo = styled.div<{ $light?: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  ${props => props.$light && css`
    justify-content: center;
  `};
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
    ${props => !props.$hover && css`
      cursor: not-allowed;`
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

export const StyledOwnerContainer = styled.div<{ $light?: boolean }>`
  position: absolute;
  top: ${props => props.$light ? "5px" : "8px"};
  left: ${props => props.$light ? "10px" : 0};
  right: 0;
  margin: ${props => props.$light ? "0" : "0 auto"};
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    setDay(calculateDifferenceInDays(date));
  }, [past]);

  function action() {
    if (watering) {
      waterPlant(plantId).then(() => dispatch(updatePlantInPlantStore({ plantId: plantId, animate: false })));
    } else {
      careForPlant(plantId).then(() => dispatch(updatePlantInPlantStore({ plantId: plantId, animate: false })));
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
          <CaringSVGContainer $hover={true} onClick={(event) => {
            event.stopPropagation();
            setModal(true);
          }}>
            {past ?
              <CheckFillSVG style={{ width: "40px", height: "40px", color: "#83b271" }} /> :
              <CheckSVG style={{ width: "40px", height: "40px", color: "#83b271" }} />}
          </CaringSVGContainer>
        </ScheduleIconsContainer>
      </StyledScheduleContainer>
    </>
  );
}

export default React.memo(function PlantComponent({ plantId, userId, light }: {
  plantId: number,
  userId: number,
  light?: boolean
}) {
  const navigate = useNavigate();
  const plant = useAppSelector(state => selectPlantById(state, plantId));
  const plantWatered = useAppSelector(getPlantWatered);
  const plantCaredFor = useAppSelector(getPlantCaredFor);
  const backgroundColor = useAppSelector(state => selectColorById(state, plantId));
  const [showRain, setShowRain] = useState<boolean>(plantWatered === plantId);
  const [showCaringAnimation, setShowCaringAnimation] = useState<boolean>(plantCaredFor === plantId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updatePlantInPlantStore({ plantId: plantId, animate: false }));

  }, [plantId]);

  useEffect(() => {
    if (plantWatered === plantId) {
      setShowRain(true);
      setTimeout(() => dispatch(resetPlantWatered()), 5000);
    } else {
      setShowRain(false);
    }

    if (plantCaredFor === plantId) {
      setShowCaringAnimation(true);
      setTimeout(() => dispatch(resetPlantCaredFor()), 5000);
    } else {
      setShowCaringAnimation(false);
    }
  }, [plantWatered, plantCaredFor]);

  if (!plant) {
    return <div> Loading... </div>;
  }

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
    <StyledPlantComponentContainer color={backgroundColor} $light={light}
      onClick={() => navigate("/plant/" + plant.plantId)}>
      {showRain && <RainAnimation key={"rainAnimation_" + plantId} plantName={plant.plantName} large={false} />}
      {showCaringAnimation &&
        <CaringAnimation key={"caringAnimation_" + plantId} plantName={plant.plantName} large={false} />}
      <StyledMoodContainer>
        {mood === "happy" && <HappyFaceSVG style={{ color: "#83b271", width: "50px", height: "50px" }} />}
        {mood === "neutral" && <NeutralFaceSVG style={{ color: "orange", width: "50px", height: "50px" }} />}
        {mood === "angry" && <AngryFaceSVG style={{ color: "red", width: "50px", height: "50px" }} />}
      </StyledMoodContainer>
      <StyledOwnerContainer $light={light} title={userId === plant.owner.id ? "My plant" : "Cared for plant"}>
        {userId === plant.owner.id && <HouseSVG style={{ color: "#83b271", width: "35px", height: "35px" }} />}
        {userId !== plant.owner.id && <KeySVG style={{ color: "#83b271", width: "40px", height: "40px" }} />}
      </StyledOwnerContainer>
      <StyledPlantImageContainer>
        {plant.plantImageUrl ?
          <img alt={"plant image"} src={plant.plantImageUrl} style={{ width: "200px", height: "200px", objectFit: "cover" }} /> :
          <ImagePlaceholderSVG style={{ width: "200px", height: "200px" }} />}
        <StyledPlantTitle $underline={true}
          onClick={() => navigate("/plant/" + plant.plantId)}>{plant.plantName}</StyledPlantTitle>
      </StyledPlantImageContainer>
      <StyledPlantMainInfo $light={light}>
        <StyledPlantDescription>{plant.species}</StyledPlantDescription>
        <StyledDividerSmall />
        {plant.careInstructions}
        {!light &&
          <>
            <StyledDividerSmall style={{ marginBottom: "auto" }} />
            <Schedule plantId={plant.plantId} userId={userId} text={"Next watering date:"} date={plant.nextWateringDate}
              svg={<DropSVG style={{ color: "#00beff", width: "50px", height: "50px" }} />}
              watering={true} />
            <Schedule plantId={plant.plantId} userId={userId} text={"Next caring date:"} date={plant.nextCaringDate}
              svg={<BandaidSVG style={{ color: "#ffaf00", width: "50px", height: "50px" }} />}
              watering={false} />
          </>}
      </StyledPlantMainInfo>
    </StyledPlantComponentContainer>
  );
})