import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSpaces, getSpacesOfUser, selectLoggedInUser } from "../../store/appSlice";
import { useNavigate, useParams } from "react-router-dom";
import { StyledSecondaryButton } from "./QRCodeComponent";
import { ReactComponent as HouseSVG } from "../../assets/house-door.svg";
import { ReactComponent as KeySVG } from "../../assets/key.svg";

const StyledSpacesMenuContainer = styled.div`
  width: 20vw;
  min-width: 200px;
  height: calc(100vh - 80px);
  margin-top: 79px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
`;

const StyledSpaceMenuItem = styled.div<{selected?: boolean}>`
  padding: 10px;
  border: 2px solid #83b271;
  border-radius: 5px;
  font-size: 2rem;
  margin: 5px 2px;
  text-align: center;
  position: relative;
  
  &:hover {
    cursor: pointer;
    background-color: #83b271;
    color: white;
    svg {
      fill: white;
    }
  }
  
  ${props => props.selected && css`
    background-color: #83b271aa;
    color: white;
    svg {
      fill: white;
    }
  `}
  
  svg {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 2px;
    margin: auto 0;
  }
`;

export function SpacesMenu() {
  const spaces = useAppSelector(getSpacesOfUser);
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const { spaceId } = useParams<{ spaceId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSpaces(loggedInUser.id));
  }, []);

  return (
    <StyledSpacesMenuContainer>
      {spaces.map((space) => (
        <StyledSpaceMenuItem key={space.spaceId} selected={space.spaceId === Number(spaceId)} onClick={() => navigate("/spaces/" + space.spaceId)}>
          {space.spaceName}
          {loggedInUser.id === space.spaceOwner.id && <HouseSVG style={{ color: "#83b271", width: "25px", height: "25px" }} />}
          {loggedInUser.id !== space.spaceOwner.id && <KeySVG style={{ color: "#83b271", width: "30px", height: "30px" }} />}
        </StyledSpaceMenuItem>
      ))}
      <StyledSecondaryButton
        disabled={false}
        onClick={() => navigate("/createSpace")}>Create new space</StyledSecondaryButton>
    </StyledSpacesMenuContainer>
  )
}