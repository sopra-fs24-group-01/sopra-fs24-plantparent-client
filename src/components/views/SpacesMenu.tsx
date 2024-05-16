import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSpaces, getSpacesOfUser, selectLoggedInUser } from "../../store/appSlice";

const StyledSpacesMenuContainer = styled.div`
  width: 20vw;
  min-width: 200px;
  height: calc(100vh - 80px);
  margin-top: 79px;
`;

const StyledSpaceMenuItem = styled.div`
  padding: 10px;
  border: 2px solid #83b271;
  border-radius: 5px;
  font-size: 2rem;
  margin: 5px 0;
  text-align: center;
  
  &:hover {
    cursor: pointer;
    background-color: #83b271;
    color: white;
  }
`;

export function SpacesMenu() {
  const spaces = useAppSelector(getSpacesOfUser);
  const loggedInUser = useAppSelector(selectLoggedInUser)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSpaces(loggedInUser.id));
  }, []);

  return (
    <StyledSpacesMenuContainer>
      {spaces.map((space) => (
        <StyledSpaceMenuItem key={space.spaceId}>
          {space.spaceName}
        </StyledSpaceMenuItem>
      ))}
    </StyledSpacesMenuContainer>
  )
}