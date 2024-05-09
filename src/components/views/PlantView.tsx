import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as DropSVG } from "../../assets/droplet-half.svg";
import { ReactComponent as BandaidSVG } from "../../assets/bandaid.svg";
import { ReactComponent as ImagePlaceholderSVG } from "../../assets/image_placeholder.svg";
import { getStatus, selectLoggedInUser } from "../../store/appSlice";
import { Schedule, StyledOwnerContainer, StyledPlantTitle } from "./PlantComponent";
import { formatDate, isInThePast } from "../../helpers/util";
import { ReactComponent as EditPlantSVG } from "../../assets/pencil-square.svg";
import PropTypes from "prop-types";
import { CaretakerSelectorComponent } from "./CaretakerSelectorComponent";
import { ReactComponent as AddUserSVG } from "../../assets/person-add.svg";
import { CaretakerComponent } from "./CaretakerComponent";
import { PlantFull } from "../../types";
import { deletePlantById, getPlantById } from "../../service/appService";
import { ReactComponent as HappyFaceSVG } from "../../assets/emoji-smile-fill.svg";
import { ReactComponent as NeutralFaceSVG } from "../../assets/emoji-neutral-fill.svg";
import { ReactComponent as AngryFaceSVG } from "../../assets/emoji-dizzy-fill.svg";
import { Modal } from "./PopupMsgComponent";
import { ReactComponent as KeySVG } from "../../assets/key.svg";
import { ReactComponent as HouseSVG } from "../../assets/house-door.svg";
import { QRCodeComponent } from "./QRCodeComponent";


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

const StyledAddCaretakerContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    color: #4f7343 !important;
  }
`;

const StyledMoodContainer = styled.div`
  position: absolute;
  top: 8px;
  left: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDeleteButton = styled.button`
  color: #ffffff;
  font-size: 1.5rem;
  background-color: red;
  width: 380px;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin: 50px auto 5px auto;
  
  &:hover {
    ${props => !props.disabled && css`
      cursor: pointer;
      scale: 0.95;`
}
  }
`;

function TextContainer({ svg, children }) {
  return (
    <StyledIndividualCaringContainer>
      <StyledCaringImageContainer>
        {svg}
      </StyledCaringImageContainer>
      <StyledCaringTextContainer>
        {children}
      </StyledCaringTextContainer>
    </StyledIndividualCaringContainer>
  );
}

TextContainer.propTypes = {
  svg: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
};


export default function PlantView() {
  const user = useAppSelector(selectLoggedInUser);
  const appStatus = useAppSelector(getStatus);
  const { plantId } = useParams<{ plantId: string }>();
  const [plant, setPlant] = useState<PlantFull | null>(null);
  const navigate = useNavigate();
  const [showSelectCaretakers, setShowSelectCaretakers] = useState<boolean>(false);
  const [reloadCaretakers, setReloadCaretakers] = useState<boolean>(false);
  const [mood, setMood] = useState<string>("happy");
  const [modal, setModal] = useState<boolean>(false);

  function confirmDelete() {
    deletePlantById(Number(plantId)).then();
    setModal(false);
    navigate("/");
  }

  useEffect(() => {
    async function fetchPlant() {
      const fetchedPlant = await getPlantById(Number(plantId));
      setPlant(fetchedPlant);
    }

    fetchPlant();
  }, [plantId]);

  useEffect(() => {
    if (plant) {
      // next watering date or next caring date in the past
      if ((isInThePast(plant.nextWateringDate) && !isInThePast(plant.nextCaringDate)) ||
        (!isInThePast(plant.nextWateringDate) && isInThePast(plant.nextCaringDate))) {
        setMood("neutral");
      }
      // next watering date and next caring date in the past
      if (isInThePast(plant.nextWateringDate) && isInThePast(plant.nextCaringDate)) {
        setMood("angry");
      }
    }
  }, [plant]);

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {modal && <Modal setModal={setModal} action={confirmDelete}
          text={`Are you sure you want to delete the plant?`} />}
      <Header />
      {appStatus === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
          {showSelectCaretakers &&
            <CaretakerSelectorComponent plantId={plantId} setShowSelectCaretakers={setShowSelectCaretakers}
              reloadCaretakers={reloadCaretakers}
              setReloadCaretakers={setReloadCaretakers} />}
          {user.id === plant.owner.id &&
            <StyledEditPlantContainer onClick={() => navigate("/editPlant/" + plant.plantId)}>
              <EditPlantSVG style={{ width: "35px", height: "35px" }} />
            </StyledEditPlantContainer>}
          <StyledPlantProfileContainer>
            <StyledPlantProfileHeader>
              <StyledPlantTitle $underline={false}>{plant.plantName}</StyledPlantTitle>
              <StyledAddCaretakerContainer>
                <AddUserSVG onClick={() => setShowSelectCaretakers(!showSelectCaretakers)}
                  style={{ color: "#83b271", width: "60px", height: "60px", margin: "auto" }} />
                <div>Add Caretaker</div>
              </StyledAddCaretakerContainer>
            </StyledPlantProfileHeader>
            <StyledPlantProfileDetails>
              <StyledPlantImageContainer>
                <ImagePlaceholderSVG style={{ width: "200px", height: "200px" }} />
              </StyledPlantImageContainer>
              <StyledMoodContainer>
                {mood === "happy" && <HappyFaceSVG style={{ color: "#83b271", width: "55px", height: "55px" }} />}
                {mood === "neutral" && <NeutralFaceSVG style={{ color: "orange", width: "55px", height: "55px" }} />}
                {mood === "angry" && <AngryFaceSVG style={{ color: "red", width: "55px", height: "55px" }} />}
              </StyledMoodContainer>
              <StyledOwnerContainer title={user.id === plant.owner.id ? "My plant" : "Cared for plant"}>
                {user.id === plant.owner.id && <HouseSVG style={{ color: "#83b271", width: "35px", height: "35px" }} />}
                {user.id !== plant.owner.id && <KeySVG style={{ color: "#83b271", width: "40px", height: "40px" }} />}
              </StyledOwnerContainer>
              <QRCodeComponent plant={plant} />
              <StyledScheduleIconsContainer>
                <StyledScheduleIconContainer>
                  <Schedule plantId={plant.plantId} userId={user.id} text={"Water"} date={plant.nextWateringDate}
                    svg={<DropSVG style={{ color: "#00beff", width: "50px", height: "50px" }} />}
                    watering={true} showText={false} />
                </StyledScheduleIconContainer>
                <StyledScheduleIconContainer>
                  <Schedule plantId={plant.plantId} userId={user.id} text={"Care"} date={plant.nextCaringDate}
                    svg={<BandaidSVG style={{ color: "#ffaf00", width: "50px", height: "50px" }} />}
                    watering={false} showText={false} />
                </StyledScheduleIconContainer>
              </StyledScheduleIconsContainer>
            </StyledPlantProfileDetails>
          </StyledPlantProfileContainer>
          <StyledDividerSmall />
          <StyledPlantDescription><StyledSmallText>Plant info:</StyledSmallText> {plant.species}
          </StyledPlantDescription>
          <StyledDividerSmall />
          <StyledPlantDescription><StyledSmallText>Care instructions:</StyledSmallText>{plant.careInstructions}
          </StyledPlantDescription>
          <StyledDividerSmall style={{ marginBottom: "auto" }} />
          <StyledCalendarTitle>Caring Schedule
            {user.id === plant.owner.id &&
            <StyledEditScheduleContainer onClick={() => navigate("/editSchedule/" + plant.plantId)}>
              <EditPlantSVG style={{ width: "30px", height: "30px", marginTop: "5px" }} />
            </StyledEditScheduleContainer>
            }
          </StyledCalendarTitle>
          <StyledCaringContainer>
            <TextContainer
              svg={<DropSVG style={{ color: "#00beff", width: "50px", height: "50px", margin: "auto" }} />}>
              <StyledIndividualCaringText><StyledSmallText>Last Watering
                Date:</StyledSmallText> {formatDate(plant.lastWateringDate)}</StyledIndividualCaringText>
              <StyledIndividualCaringText><StyledSmallText>Next Watering
                Date:</StyledSmallText> {formatDate(plant.nextWateringDate)}</StyledIndividualCaringText>
              <StyledIndividualCaringText><StyledSmallText>Watering
                Interval:</StyledSmallText> every {plant.wateringInterval} day(s)</StyledIndividualCaringText>
            </TextContainer>
            <TextContainer
              svg={<BandaidSVG style={{ color: "#ffaf00", width: "50px", height: "50px", margin: "auto" }} />}>
              <StyledIndividualCaringText><StyledSmallText>Last Caring
                Date:</StyledSmallText> {formatDate(plant.lastCaringDate)}</StyledIndividualCaringText>
              <StyledIndividualCaringText><StyledSmallText>Next Caring
                Date:</StyledSmallText> {formatDate(plant.nextCaringDate)}</StyledIndividualCaringText>
              <StyledIndividualCaringText><StyledSmallText>Caring
                Interval:</StyledSmallText> every {plant.caringInterval} day(s)</StyledIndividualCaringText>
            </TextContainer>
          </StyledCaringContainer>
          <StyledDividerSmall />
          <CaretakerComponent plantId={plantId} setShowSelectCaretakers={setShowSelectCaretakers}
            reloadCaretakers={reloadCaretakers} setReloadCaretakers={setReloadCaretakers} />
          {plant.owner.id === user.id && (
            <StyledDeleteButton onClick={() => setModal(true)}>Delete Plant</StyledDeleteButton>
          )}
        </StyledMainContainer>
      }
    </>
  );
}