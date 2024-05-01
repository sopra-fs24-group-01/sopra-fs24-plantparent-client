import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as DropSVG } from "../../assets/droplet-half.svg";
import { ReactComponent as BandaidSVG } from "../../assets/bandaid.svg";
import { ReactComponent as ImagePlaceholderSVG } from "../../assets/image_placeholder.svg";
import { getStatus, selectLoggedInUser } from "../../store/appSlice";
import { Schedule, StyledPlantTitle } from "./PlantComponent";
import { formatDate, isInThePast } from "../../helpers/util";
import { ReactComponent as EditPlantSVG } from "../../assets/pencil-square.svg";
import PropTypes from "prop-types";
import { CaretakerSelectorComponent } from "./CaretakerSelectorComponent";
import { ReactComponent as AddUserSVG } from "../../assets/person-add.svg";
import { CaretakerComponent } from "./CaretakerComponent";
import { PlantFull, User } from "../../types";
import { getPlantById, getUserById } from "../../service/appService";
import { ReactComponent as HappyFaceSVG } from "../../assets/emoji-smile-fill.svg";
import { ReactComponent as NeutralFaceSVG } from "../../assets/emoji-neutral-fill.svg";
import { ReactComponent as AngryFaceSVG } from "../../assets/emoji-dizzy-fill.svg";


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
  margin-right: auto;
`;

const StyledPlantImageContainer = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  width: fit-content;
  margin-right: 25px;
  margin-left: 25px;
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

const StyledEditPlantContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 8px;
  color: #83b271;

  &:hover {
    cursor: pointer;
    color: #4f7343;
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
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const appStatus = useAppSelector(getStatus);
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

useEffect(() => {
    async function fetchUser() {
        const fetchedUser = await getUserById(Number(userId));
        setUser(fetchedUser);
    }

    fetchUser();
}, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      {appStatus === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
            {user.id === loggedInUser?.id && (
                <StyledEditPlantContainer onClick={() => navigate("/editUser/" + user.id)}>
                <EditPlantSVG style={{ width: "35px", height: "35px" }} />
                </StyledEditPlantContainer>
            )}
          <StyledPlantProfileContainer>
            <StyledPlantProfileHeader>
              <StyledPlantTitle $underline={false}>{user.username}</StyledPlantTitle>
            </StyledPlantProfileHeader>
            <StyledPlantProfileDetails>
              <StyledPlantImageContainer>
                <ImagePlaceholderSVG style={{ width: "200px", height: "200px" }} />
              </StyledPlantImageContainer>
              <StyledPlantDescription>
                <StyledSmallText>Email:</StyledSmallText> {user.email}
              </StyledPlantDescription>
            </StyledPlantProfileDetails>
          </StyledPlantProfileContainer>
        </StyledMainContainer>
      }
    </>
  );
}