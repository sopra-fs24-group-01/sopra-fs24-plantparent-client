import React from "react";
import styled from "styled-components";
import { ReactComponent as DropSVG } from "../../assets/droplet-half.svg";
import { getRandomNumberBetween } from "../../helpers/util";

const StyledRainContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff80;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const StyledRaindrop = styled.div<{ $size: number, $left: number, $speed: number }>`
  position: absolute;
  left: ${props => props.$left}%;
  animation: fall ${props => props.$speed}s linear infinite;
  opacity: 1;
  z-index: 2;

  svg {
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    color: #00beff
  }

  @keyframes fall {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`;

const StyledPlantInfo = styled.div`
  position: absolute;
  font-size: 3.5rem;
  font-style: italic;
  color: #83b271;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function RainAnimation() {
  const numRaindrops = 50;

  return (
    <StyledRainContainer>
      {Array.from({ length: numRaindrops }).map((_, i) => (
        <StyledRaindrop
          key={i}
          $size={getRandomNumberBetween(20, 40)}
          $left={getRandomNumberBetween(0, 100)}
          $speed={getRandomNumberBetween(2, 5)}>
          <DropSVG />
        </StyledRaindrop>
      ))}
      <StyledPlantInfo>Plant xyz watered</StyledPlantInfo>
    </StyledRainContainer>
  );
}