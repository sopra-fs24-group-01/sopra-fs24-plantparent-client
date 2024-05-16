import React from "react";
import styled from "styled-components";
import { ReactComponent as BandAidSVG } from "../../assets/bandaid.svg";
import { getRandomNumberBetween } from "../../helpers/util";
import { StyledAnimationContainer, StyledCaringContainer, StyledPlantInfo } from "./RainAnimationComponent";

export function CaringAnimation({ plantName }: { plantName: string }) {
  const numItems = 25;

  return (
    <StyledCaringContainer>
      {Array.from({ length: numItems }).map((_, i) => (
        <StyledAnimationContainer
          key={i}
          $size={getRandomNumberBetween(20, 40)}
          $left={getRandomNumberBetween(0, 100)}
          $speed={getRandomNumberBetween(1, 5)}
          $color={"#ffaf00"}>
          <BandAidSVG />
        </StyledAnimationContainer>
      ))}
      <StyledPlantInfo>{plantName} was just cared for!</StyledPlantInfo>
    </StyledCaringContainer>
  );
}