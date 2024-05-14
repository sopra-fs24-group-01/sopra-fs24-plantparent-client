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
import { InputFieldComponent } from "./InputFieldComponent";


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
            <InputFieldComponent
              id={"plantName"}
              type={"text"}
              validInput={true}
              placeholder={"Plant name"}
              value={plantName}
              onChange={setPlantName}
              tooltip={"The name you would like to call your plant."}/>
            <InputFieldComponent
              id={"species"}
              type={"text"}
              validInput={true}
              placeholder={"Species"}
              value={species}
              onChange={setSpecies}
              tooltip={"Specify the type of plant you want to create."}/>
            <InputFieldComponent
              id={"careInstruction"}
              type={"text"}
              validInput={true}
              placeholder={"Care Instructions"}
              value={careInstructions}
              onChange={setCareInstructions}
              tooltip={"What are the important steps one needs to follow to care for this plant?"}/>
            <label htmlFor="lastWateringDate">Last Watering Date</label>
            <InputFieldComponent
              id={"lastWateringDate"}
              type={"date"}
              validInput={true}
              placeholder={"Last Watering Date"}
              value={lastWateringDate}
              onChange={setLastWateringDate}
              max={new Date().toISOString().split("T")[0]}
              tooltip={"When was the last time this plant was watered?"}/>
            <InputFieldComponent
              id={"wateringInterval"}
              type={"number"}
              validInput={true}
              placeholder={"Watering Interval (in days)"}
              value={wateringInterval}
              onChange={setWateringInterval}
              tooltip={"How often does this plant need to be watered? (in days)"}/>
            <label htmlFor="lastCaringDate">Last Caring Date</label>
            <InputFieldComponent
              id={"lastCaringDate"}
              type={"date"}
              validInput={true}
              placeholder={"Last Caring Date"}
              value={lastCaringDate}
              onChange={setLastCaringDate}
              max={new Date().toISOString().split("T")[0]}
              tooltip={"When was the last time this plant was cared for? (fertilized, etc.)"}/>
            <InputFieldComponent
              id={"caringInterval"}
              type={"number"}
              validInput={true}
              placeholder={"Caring Interval (in days)"}
              value={caringInterval}
              onChange={setCaringInterval}
              tooltip={"How often does this plant need to be cared for? (in days)"}/>
            <StyledPrimaryButton disabled={!plantName || !species || !careInstructions || !lastWateringDate || !wateringInterval || !lastCaringDate || !caringInterval}
              type="submit">Create Plant</StyledPrimaryButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
    </>
  );
}