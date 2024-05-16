import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSpaces, getSpacesOfUser, selectLoggedInUser } from "../../store/appSlice";
import { useNavigate, useParams } from "react-router-dom";

const StyledSpacesMenuContainer = styled.div`
  width: 20vw;
  min-width: 200px;
  height: calc(100vh - 80px);
  margin-top: 79px;
`;

const StyledSpaceMenuItem = styled.div<{selected?: boolean}>`
  padding: 10px;
  border: 2px solid #83b271;
  border-radius: 5px;
  font-size: 2rem;
  margin: 5px 2px;
  text-align: center;
  
  &:hover {
    cursor: pointer;
    background-color: #83b271;
    color: white;
  }
  
  ${props => props.selected && css`
    background-color: #83b271aa;
    color: white;
  `}
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
        </StyledSpaceMenuItem>
      ))}
    </StyledSpacesMenuContainer>
  )
}