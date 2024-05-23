import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import {
  getCaredFOrPlantsCount,
  getOwnedPlantsCount,
  getStatus,
  logoutUser,
  selectLoggedInUser, updateUserRedux,
} from "../../store/appSlice";
import { StyledPlantTitle } from "./PlantComponent";
import { ReactComponent as EditPlantSVG } from "../../assets/pencil-square.svg";
import { StyledPrimaryButton } from "./Login";
import { StyledDeleteButton } from "./PlantView";
import { Modal } from "./PopupMsgComponent";


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
  justify-content: center;
`;

const StyledUserDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  margin-bottom: 15px;
  text-align: center;
`;

const StyledStatsContainer = styled.div`
  margin: 20px 25px 0 25px;
  display: flex;
  flex-direction: column;
`;

const StyledStatNumber = styled.div`
  font-size: 2.5rem;
  display: flex;
  justify-content: center;
  color: #83b271;
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
  const ownedPlantsCount = useAppSelector(getOwnedPlantsCount);
  const caredForPlantsCount = useAppSelector(getCaredFOrPlantsCount);
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    dispatch(updateUserRedux)
  }, [])

  function confirmLogout() {
    setModal(false);
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <>
      {modal && <Modal setModal={setModal} action={confirmLogout}
        text={"Are you sure you want to log out?"} />}
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
              <StyledStatsContainer><div>Owned Plants:</div>
                <StyledStatNumber>{ownedPlantsCount}</StyledStatNumber></StyledStatsContainer>
              <StyledUserDescription>
                <StyledSmallText>Email:</StyledSmallText> {loggedInUser.email}
                <StyledPrimaryButton type="button" onClick={() => navigate("/editPassword")}>
                  Change Password
                </StyledPrimaryButton>
                <StyledDeleteButton onClick={() => setModal(true)}>Logout</StyledDeleteButton>
              </StyledUserDescription>
              <StyledStatsContainer><div>Cared for Plants:</div>
                <StyledStatNumber>{caredForPlantsCount}</StyledStatNumber>
              </StyledStatsContainer>
            </StyledUserProfileDetails>
          </StyledUserProfileContainer>
        </StyledMainContainer>
      }
    </>
  );
}