import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledInputField, StyledLink,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledP, StyledPrimaryButton,
} from "./Login";
import { useDispatch } from "react-redux";
import { registerPlant } from "../../store/plantSlice";


export default function createPlant() {
  const [plantName, setPlantName] = useState<string>(null);
  const [species, setSpecies] = useState<string>(null);
  const [careInstructions, setCareInstructions] = useState<string>(null);
  const [lastWateringDate, setLastWateringDate] = useState<string>(null);
  const [wateringInterval, setWateringInterval] = useState<string>(null);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function doCreatePlant() {
    console.log("Creation for plant with plant name " + plantName);

    const plant = {
      plantName: plantName,
      species: species,
      careInstructions: careInstructions,
      lastWateringDate: lastWateringDate,
      wateringInterval: wateringInterval,
      nextWateringDate: lastWateringDate + wateringInterval,
    };
    try {
      await dispatch(registerPlant(plant));
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <StyledMainContainer>
      <StyledLoginContainer>
        <StyledLogoContainerLarge>
          <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
        </StyledLogoContainerLarge>
        <StyledForm onSubmit={doCreatePlant}>
          <StyledInputField id="plantName"
                            type="text"
                            value={plantName}
                            validInput={true}
                            placeholder="Plant Name"
                            onChange={(event) => setPlantName(event.target.value)} />
          <StyledInputField id="species"
                            type="text"
                            value={species}
                            validInput={true}
                            placeholder="Species"
                            onChange={(event) => setSpecies(event.target.value)} />
          <StyledInputField id="careInstructions"
                            type="text"
                            value={careInstructions}
                            validInput={true}
                            placeholder="Care Instructions"
                            onChange={(event) => setCareInstructions(event.target.value)} />
          <label htmlFor="lastWateringDate">Last Watering Date</label>
          <StyledInputField id="lastWateringDate"
                            type="date"
                            value={lastWateringDate}
                            validInput={true}
                            placeholder="Last Watering Date"
                            onChange={(event) => setLastWateringDate(event.target.value)} />
          <StyledInputField id="wateringInterval"
                            type="number"
                            value={wateringInterval}
                            validInput={true}
                            placeholder="Watering Interval (in days)"
                            onChange={(event) => setWateringInterval(event.target.value)} />
          <StyledPrimaryButton disabled={!plantName || !species}
                               type="submit">Create Plant</StyledPrimaryButton>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}