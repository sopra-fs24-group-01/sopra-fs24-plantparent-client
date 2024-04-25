import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/logo_no_bg.svg";
import {
  StyledError,
  StyledForm,
  StyledInputField,
  StyledLoginContainer,
  StyledLogoContainerLarge,
  StyledMainContainer, StyledPrimaryButton,
} from "./Login";
import { useDispatch } from "react-redux";
import { Plant } from "../../types";
import { useAppSelector } from "../../hooks";
import { getStatus, selectLoggedInUser, selectPlantById } from "../../store/appSlice";
import { updatePlant } from "../../service/appService";


export default function EditPlant() {
  // get the logged in user from the store
  const user = useAppSelector(selectLoggedInUser);
  // capture the plantId from the URL
  const { plantId } = useParams<{ plantId: string }>();
  // get the plant from the store
  const plant = useAppSelector(state => selectPlantById(state, Number(plantId)));
  const appStatus = useAppSelector(getStatus)

  const [plantName, setPlantName] = useState<string>(plant.plantName);
  const [species, setSpecies] = useState<string>(plant.species);
  const [careInstructions, setCareInstructions] = useState<string>(plant.careInstructions);
  const [error, setError] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function doEditPlant() {
    console.log("Edit for plant with plant ID " + plantId);

    const new_plant: Plant = {
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
    };
    try {
      await updatePlant(new_plant);
      navigate("/plants/" + plantId);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  return (
    appStatus !== "succeeded" ? <div>Loading...</div> :
    <StyledMainContainer>
      <StyledLoginContainer>
        <StyledLogoContainerLarge>
          <LogoSVG style={{ height: "100px", maxWidth: "100%" }} />
        </StyledLogoContainerLarge>
        <StyledForm onSubmit={doEditPlant}>
        <label htmlFor="plantName">Plant Name</label>
          <StyledInputField id="plantName"
                            type="text"
                            value={plantName}
                            $validInput={true}
                            placeholder="Plant Name"
                            onChange={(event) => setPlantName(event.target.value)} />
          <label htmlFor="species">Species</label>
          <StyledInputField id="species"
                            type="text"
                            value={species}
                            $validInput={true}
                            placeholder="Species"
                            onChange={(event) => setSpecies(event.target.value)} />
          <label htmlFor="careInstructions">Care Instructions</label>
          <StyledInputField id="careInstructions"
                            type="text"
                            value={careInstructions}
                            $validInput={true}
                            placeholder="Care Instructions"
                            onChange={(event) => setCareInstructions(event.target.value)} />
          <StyledPrimaryButton disabled={(plantName === "" || species === "") || (plantName === plant.plantName && species === plant.species && careInstructions === plant.careInstructions) }
                              type="submit">Save Changes</StyledPrimaryButton>
          <StyledPrimaryButton onClick={() => navigate("/plant/" + plantId)}>Cancel</StyledPrimaryButton>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}