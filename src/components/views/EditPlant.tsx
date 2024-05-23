import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledPrimaryButton,
} from "./Login";
import { PlantFull, PlantSimple } from "../../types";
import { useAppSelector } from "../../hooks";
import { getStatus, selectLoggedInUser } from "../../store/appSlice";
import { getPlantById, updatePlant } from "../../service/appService";
import styled from "styled-components";
import { InputFieldComponent } from "./InputFieldComponent";
import { StyledDeleteButton } from "./PlantView";

export const StyledPageTitle = styled.h1`
  color: #83b271;
  font-size: 2rem;
  margin: 0 auto 50px auto;
`;


export default function EditPlant() {
  // get the logged in user from the store
  const user = useAppSelector(selectLoggedInUser);
  // capture the plantId from the URL
  const { plantId } = useParams<{ plantId: string }>();
  // get the plant from the store
  const appStatus = useAppSelector(getStatus);
  const navigate = useNavigate();
  const [plant, setPlant] = useState<PlantFull | null>(null);
  const [plantName, setPlantName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlant() {
      const fetchedPlant = await getPlantById(Number(plantId));
      setPlant(fetchedPlant);
      setPlantName(fetchedPlant.plantName);
      setSpecies(fetchedPlant.species);
      setCareInstructions(fetchedPlant.careInstructions);
    }

    fetchPlant();
  }, [plantId]);

  async function doEditPlant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const new_plant: PlantSimple = {
      plantId: Number(plantId),
      plantName: plantName,
      species: species,
      careInstructions: careInstructions,
      lastWateringDate: plant.lastWateringDate,
      wateringInterval: plant.wateringInterval,
      nextWateringDate: plant.nextWateringDate,
      lastCaringDate: plant.lastCaringDate,
      caringInterval: plant.caringInterval,
      nextCaringDate: plant.nextCaringDate,
      owner: { id: user.id, username: user.username, email: user.email, password: user.password },
      caretakers: plant.caretakers,
      plantImageUrl: "",
    };
    try {
      await updatePlant(new_plant);
      navigate("/plant/" + plantId);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    appStatus !== "succeeded" ? <div>Loading...</div> :
      <StyledMainContainer>
        <StyledLoginContainer>
          <StyledLogoContainerLarge>
            <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
          </StyledLogoContainerLarge>
          <StyledPageTitle>Edit Plant</StyledPageTitle>
          <StyledForm onSubmit={doEditPlant}>
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
              lengthLimit={150}
              value={careInstructions}
              onChange={setCareInstructions}
              tooltip={"What are the important steps one needs to follow to care for this plant?"}/>
            <StyledPrimaryButton
              disabled={(plantName === "" || species === "") || (plantName === plant.plantName && species === plant.species && careInstructions === plant.careInstructions)}
              type="submit">Save Changes</StyledPrimaryButton>
            <StyledDeleteButton onClick={() => navigate("/plant/" + plantId)}>Cancel</StyledDeleteButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
  );
}