import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled, { css } from "styled-components";
import { useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ImagePlaceholderSVG } from "../../assets/image_placeholder.svg";
import { getStatus, selectLoggedInUser } from "../../store/appSlice";
import { StyledPlantTitle } from "./PlantComponent";
import { ReactComponent as EditPlantSVG } from "../../assets/pencil-square.svg";
import { User } from "../../types";
import { getUserById } from "../../service/appService";
import { StyledPrimaryButton } from "./Login";


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

const StyledUserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUserProfileHeader = styled.div`
  height: 10vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledUserProfileDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: auto;
`;

const StyledUserImageContainer = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  width: fit-content;
  margin-right: 25px;
  margin-left: 25px;
`;

const StyledUserDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  margin-bottom: 15px;
  text-align: center;
`;

const StyledSmallText = styled.div`
  font-size: 1rem;
  margin: 5px;
`;

const StyledEditUserContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 8px;
  color: #83b271;

  &:hover {
    cursor: pointer;
    color: #4f7343;
  }
`;

export default function PlantView() {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const appStatus = useAppSelector(getStatus);
  const navigate = useNavigate();

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      {appStatus === "loading" ? <div>Loading...</div> :
        <StyledMainContainer>
          {loggedInUser.id === loggedInUser?.id && (
            <StyledEditUserContainer onClick={() => navigate("/editUser")}>
              <EditPlantSVG style={{ width: "35px", height: "35px" }} />
            </StyledEditUserContainer>
          )}
          <StyledUserProfileContainer>
            <StyledUserProfileHeader>
              <StyledPlantTitle $underline={false}>{loggedInUser.username}</StyledPlantTitle>
            </StyledUserProfileHeader>
            <StyledUserProfileDetails>
              <StyledUserImageContainer>
                <ImagePlaceholderSVG style={{ width: "200px", height: "200px" }} />
              </StyledUserImageContainer>
              <StyledUserDescription>
                <StyledSmallText>Email:</StyledSmallText> {loggedInUser.email}
                <StyledPrimaryButton type="button" onClick={() => navigate("/editPassword")}>
                  Change Password
                </StyledPrimaryButton>
              </StyledUserDescription>
            </StyledUserProfileDetails>
          </StyledUserProfileContainer>
        </StyledMainContainer>
      }
    </>
  );
}