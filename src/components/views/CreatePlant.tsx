import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledInputField,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledPrimaryButton,
} from "./Login";
import { PlantSimple } from "../../types";
import Header from "./Header";
import { createPlant } from "../../service/appService";
import { selectLoggedInUser } from "../../store/appSlice";
import { useAppSelector } from "../../hooks";


export default function CreatePlant() {
  const user = useAppSelector(selectLoggedInUser);
  const [plantName, setPlantName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [lastWateringDate, setLastWateringDate] = useState<string>("");
  const [wateringInterval, setWateringInterval] = useState<string>("");
  const [lastCaringDate, setLastCaringDate] = useState<string>("");
  const [caringInterval, setCaringInterval] = useState<string>("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function doCreatePlant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lastWatering = new Date(lastWateringDate);
    lastWatering.setDate(lastWatering.getDate() + Number(wateringInterval));
    const nextWateringDate = lastWatering.toISOString().split("T")[0];

    const lastCaring = new Date(lastCaringDate);
    lastCaring.setDate(lastCaring.getDate() + Number(caringInterval));
    const nextCaringDate = lastCaring.toISOString().split("T")[0];

    const plant: PlantSimple = {
      plantId: null,
      plantName: plantName,
      species: species,
      careInstructions: careInstructions,
      lastWateringDate: lastWateringDate,
      wateringInterval: Number(wateringInterval),
      nextWateringDate: nextWateringDate,
      lastCaringDate: lastCaringDate,
      caringInterval: Number(caringInterval),
      nextCaringDate: nextCaringDate,
      owner: { id: user.id, username: user.username, email: user.email, password: user.password},
      caretakers: []
    };
    try {
      await createPlant(plant);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    <>
      <Header />
      <StyledMainContainer>
        <StyledLoginContainer>
          <StyledLogoContainerLarge>
            <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
          </StyledLogoContainerLarge>
          <StyledForm onSubmit={doCreatePlant}>
            <StyledInputField id="plantName"
              type="text"
              value={plantName}
              $validInput={true}
              placeholder="Plant Name"
              onChange={(event) => setPlantName(event.target.value)} />
            <StyledInputField id="species"
              type="text"
              value={species}
              $validInput={true}
              placeholder="Species"
              onChange={(event) => setSpecies(event.target.value)} />
            <StyledInputField id="careInstructions"
              type="text"
              value={careInstructions}
              $validInput={true}
              placeholder="Care Instructions"
              onChange={(event) => setCareInstructions(event.target.value)} />
            <label htmlFor="lastWateringDate">Last Watering Date</label>
            <StyledInputField id="lastWateringDate"
              type="date"
              value={lastWateringDate}
              $validInput={true}
              placeholder="Last Watering Date"
              onChange={(event) => setLastWateringDate(event.target.value)} />
            <StyledInputField id="wateringInterval"
              type="number"
              value={wateringInterval}
              $validInput={true}
              placeholder="Watering Interval (in days)"
              onChange={(event) => setWateringInterval(event.target.value)} />
            <label htmlFor="lastCaringDate">Last Caring Date</label>
            <StyledInputField id="lastCaringDate"
              type="date"
              value={lastCaringDate}
              $validInput={true}
              placeholder="Last Caring Date"
              onChange={(event) => setLastCaringDate(event.target.value)} />
            <StyledInputField id="caringInterval"
              type="number"
              value={caringInterval}
              $validInput={true}
              placeholder="Caring Interval (in days)"
              onChange={(event) => setCaringInterval(event.target.value)} />
            <StyledPrimaryButton disabled={!plantName || !species}
              type="submit">Create Plant</StyledPrimaryButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
    </>
  );
}