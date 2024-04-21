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
import { updatePlant, getPlant } from "../../service/plantService";
import { Plant } from "../../types";
import { selectLoggedInUser } from "../../store/userSlice";
import { selectPlantById, fetchPlants } from "../../store/plantSlice";
import { useAppSelector } from "../../hooks";
import { store } from "../../store";

store.dispatch(fetchPlants());


export default function EditPlant() {
  // get the logged in user from the store
  const user = useAppSelector(selectLoggedInUser);
  // get the status of the plants from the store
  const plantStatus = useAppSelector(state => state.plants.status);
  
  // capture the plantId from the URL
  const { plantId } = useParams<{ plantId: string }>();
  // get the plant from the store
  const plant = useAppSelector(state => selectPlantById(state, Number(plantId)));

  const [plantName, setPlantName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    if(plantStatus === "succeeded") {
      setPlantName(plant.plantName);
      setSpecies(plant.species);
      setCareInstructions(plant.careInstructions);
    }
  }, [plantStatus]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function doEditPlant() {
    console.log("Edit for plant with plant ID " + plantId);

    const new_plant: Plant = {
      plantId: Number(plantId),
      owner: plant.owner,
      plantName: plantName,
      species: species,
      careInstructions: careInstructions,
      lastWateringDate: plant.lastWateringDate,
      wateringInterval: plant.wateringInterval,
      nextWateringDate: plant.nextWateringDate,
      lastCaringDate: plant.lastCaringDate,
      caringInterval: plant.caringInterval,
      nextCaringDate: plant.nextCaringDate
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
    plantStatus !== "succeeded" ? <div>Loading...</div> :
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
          <StyledPrimaryButton disabled={!plantName || !species || user.id !== plant.owner}
                              type="submit">Save Changes</StyledPrimaryButton>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}