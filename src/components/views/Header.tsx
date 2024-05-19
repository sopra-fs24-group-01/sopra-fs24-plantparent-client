import React from "react";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import { ReactComponent as ProfileSVG } from "../../assets/person-circle.svg";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "hooks";
import { selectLoggedInUser } from "store/appSlice";

const StyledHeaderContainer = styled.div`
  width: 100vw;
  height: 75px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  border-bottom: 1px solid #83b271;
  padding-bottom: 5px;
  background-color: #E6F4EA50;
`;

const StyledLogoContainerHeader = styled.div`
  max-width: 200px;
  margin-right: 50px;
  
  &:hover {
    cursor: pointer;
  }
`;

const StyledNavLink = styled.div<{$active?: boolean}>`
  font-size: 2rem;
  font-weight: bold;
  color: #83b271;
  margin: auto 25px auto 25px;
  
  ${props => props.$active && css`
    text-decoration: underline;
  `}

  &:hover{
    cursor: pointer;
    scale: 0.95;
    text-decoration: none;
  }

  &:after {
    content: "";
    background-color: #83b271;
    position: absolute;
    bottom: 1px;
    left: 0;
    height: 3px;
    width: 0;
    transition: 0.2s;
  }
  &:hover:after {
    width: 100%;
  }
`;

const StyledDateHeader = styled.div`
  margin: auto;
  font-size: 2rem;
  font-weight: bold;
`;

const StyledIconContainer = styled.div`
  max-width: 75px;
  max-height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 25px;
  
  &:hover {
    cursor: pointer;
    scale: 0.95;
  }
`;

function Header() {
  const location = useLocation();
  const pathname = location.pathname;
  const loggedInUser = useAppSelector(selectLoggedInUser);

  const navigate = useNavigate();

  const today = new Date();
  const options = {
    weekday: "long", // Display the day of the week as a full text (Monday)
    day: "numeric",  // Display the day of the month (2-digit)
    month: "numeric", // Display the month as a number (2-digit)
    year: "numeric",  // Display the year (4-digit)
  };

  const formattedDate = today.toLocaleDateString("de-DE", options);


  return (
    <StyledHeaderContainer>
      <StyledLogoContainerHeader onClick={() => navigate("/")}>
        <LogoSVG style={{height: "100%", maxWidth: "100%"}} />
      </StyledLogoContainerHeader>
      <StyledNavLink $active={pathname === "/"} onClick={() => navigate("/")}>Home</StyledNavLink>
      <StyledNavLink $active={pathname === "/myPlants"} onClick={() => navigate("/myPlants")}>My Plants</StyledNavLink>
      <StyledDateHeader>{formattedDate}</StyledDateHeader>
      <StyledIconContainer onClick={() => navigate("/profile")}>
        <ProfileSVG style={{width: "50px", height: "50px"}} />
      </StyledIconContainer>
    </StyledHeaderContainer>
  )
}

export default Header;
