import React, { useState } from "react";
import styled from "styled-components";
import { Plant } from "../../types";
import { ReactComponent as ImagePlaceholderSVG } from "../../assets/image_placeholder.svg";
import { StyledMainContainer } from "./Login";


const StyledPlantComponentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 5px;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid #83b271;
  height: 250px;
`;

const StyledPlantImageContainer = styled.div`
  display: flex;
  justify-content: right;
  flex-direction: column;
  width: fit-content;
  margin-right: 25px;
`;

const StyledPlantTitle = styled.div`
  color: #83b271;
  font-size: 2rem;
  margin: 0 auto;
`;

const StyledPlantMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  align-items: flex-start;
  height: 100%;
`;

const StyledDividerSmall = styled.hr`
  width: 100px;
  border-top: 3px solid #83b271;
  margin-left: 0;
`;

const StyledPlantDescription = styled.div`
  padding-right: 50px;
`;

const StyledSchedule = styled.div`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;


export default function PlantComponent({ plant }: { plant: Plant }) {

  return (
    <StyledPlantComponentContainer>
      <StyledPlantImageContainer>
        <ImagePlaceholderSVG style={{ width: "200px", height: "200px" }} />
        <StyledPlantTitle>{plant.plantName}</StyledPlantTitle>
      </StyledPlantImageContainer>
      <StyledPlantMainInfo>
        <StyledPlantDescription>{plant.species}</StyledPlantDescription>
        <StyledDividerSmall />
        {plant.careInstructions}
        <StyledDividerSmall style={{marginBottom: 'auto'}}/>
        <StyledSchedule >Watering Schedule:</StyledSchedule>
        <StyledSchedule>Caring Schedule:</StyledSchedule>
      </StyledPlantMainInfo>
    </StyledPlantComponentContainer>
  );
}