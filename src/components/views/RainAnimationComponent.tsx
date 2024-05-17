import React from "react";
import styled from "styled-components";
import { ReactComponent as DropSVG } from "../../assets/droplet-half.svg";
import { getRandomNumberBetween } from "../../helpers/util";

export const StyledCaringContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

export const StyledAnimationContainer = styled.div<{
  $size: number,
  $left: number,
  $speed: number,
  $color: string,
  $large: boolean}>`
  position: absolute;
  left: ${props => props.$left}%;
  animation: fall ${props => props.$speed}s linear infinite;
  opacity: 1;
  z-index: 2;

  svg {
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    color: ${props => props.$color};
  }

  @keyframes fall {
    0% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(${props => props.$large ? "100vh" : "20vh"});
    }
  }
`;

export const StyledPlantInfo = styled.div`
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

export function RainAnimation({ plantName, large }: { plantName: string, large?: boolean}) {
  const numRaindrops = 25;

  return (
    <StyledCaringContainer>
      {Array.from({ length: numRaindrops }).map((_, i) => (
        <StyledAnimationContainer
          key={i}
          $size={getRandomNumberBetween(20, 40)}
          $left={getRandomNumberBetween(0, 100)}
          $speed={getRandomNumberBetween(large ? 3 : 1, 5)}
          $color={"#00beff"}
          $large={large}>
          <DropSVG />
        </StyledAnimationContainer>
      ))}
      <StyledPlantInfo>{plantName} was just watered!</StyledPlantInfo>
    </StyledCaringContainer>
  );
}