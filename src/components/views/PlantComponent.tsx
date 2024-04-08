import React, { useState } from "react";
import styled from "styled-components";
import { Plant } from "../../types";


const StyledPlantComponentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5px;
  padding: 25px;
  border-radius: 10px;
  border: 2px solid #83b271;
`;


export default function PlantComponent({plant}: {plant: Plant}) {

  return (
    <StyledPlantComponentContainer>
      {plant.careInstructions}
    </StyledPlantComponentContainer>
  )
}