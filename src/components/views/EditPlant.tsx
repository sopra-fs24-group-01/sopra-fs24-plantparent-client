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
import { useAppSelector } from "../../hooks";


export default function EditPlant() {
  const user = useAppSelector(selectLoggedInUser);
  
  // capture the plantId from the URL
  const { plantId } = useParams<{ plantId: string }>();

  const [plantName, setPlantName] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [careInstructions, setCareInstructions] = useState<string>("");
  const [lastWateringDate, setLastWateringDate] = useState<string>("");
  const [wateringInterval, setWateringInterval] = useState<number>(null);
  const [lastCaringDate, setLastCaringDate] = useState<string>("");
  const [caringInterval, setCaringInterval] = useState<number>(null);
  const [error, setError] = useState("");
  const [plant, setPlant] = useState<Plant | null>(null);

  // fetch the plant data from the backend
  useEffect(() => {
    getPlant(plantId).then(setPlant);
  }, [plantId]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function doEditPlant() {
    console.log("Edit for plant with plant name " + plantName);

    const plant: Plant = {
      plantId: Number(plantId),
      owner: user.id,
      plantName: plantName,
      species: species,
      careInstructions: careInstructions,
      lastWateringDate: lastWateringDate,
      wateringInterval: wateringInterval,
      nextWateringDate: lastWateringDate + wateringInterval,
      lastCaringDate: lastCaringDate,
      caringInterval: caringInterval,
      nextCaringDate: lastCaringDate + caringInterval
    };
    try {
      await updatePlant(plant);
      navigate("/plants/" + plantId);
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
        <StyledForm onSubmit={doEditPlant}>
          <StyledInputField id="plantName"
                            type="text"
                            value={plant.plantName}
                            $validInput={true}
                            placeholder="Plant Name"
                            onChange={(event) => setPlantName(event.target.value)} />
          <StyledInputField id="species"
                            type="text"
                            value={plant.species}
                            $validInput={true}
                            placeholder="Species"
                            onChange={(event) => setSpecies(event.target.value)} />
          <StyledInputField id="careInstructions"
                            type="text"
                            value={plant.careInstructions}
                            $validInput={true}
                            placeholder="Care Instructions"
                            onChange={(event) => setCareInstructions(event.target.value)} />
          <StyledPrimaryButton disabled={!plantName || !species}
                               type="submit">Save Changes</StyledPrimaryButton>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}