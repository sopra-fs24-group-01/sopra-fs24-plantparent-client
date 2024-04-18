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
  const [nextWateringDate, setNextWateringDate] = useState<string>("");
  const [nextCaringDate, setNextCaringDate] = useState<string>("");
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
    console.log("Edit Schedule for plant with plant name " + plantName);

    const plant: Plant = {
      plantId: Number(plantId),
      owner: user.id,
      plantName: plantName,
      species: species,
      careInstructions: careInstructions,
      lastWateringDate: lastWateringDate,
      wateringInterval: wateringInterval,
      nextWateringDate: nextWateringDate,
      lastCaringDate: lastCaringDate,
      caringInterval: caringInterval,
      nextCaringDate: nextCaringDate
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
          <label htmlFor="nextWateringDate">Next Watering Date</label>
          <StyledInputField id="nextWateringDate"
                            type="date"
                            value={plant.nextWateringDate}
                            $validInput={true}
                            placeholder="Next Watering Date"
                            onChange={(event) => setNextWateringDate(event.target.value)} />
          <StyledInputField id="wateringInterval"
                            type="number"
                            value={plant.wateringInterval}
                            $validInput={true}
                            placeholder="Watering Interval (in days)"
                            onChange={(event) => setWateringInterval(Number(event.target.value))} />
          <label htmlFor="nextCaringDate">Next Caring Date</label>
          <StyledInputField id="nextCaringDate"
                            type="date"
                            value={plant.nextCaringDate}
                            $validInput={true}
                            placeholder="Next Caring Date"
                            onChange={(event) => setNextCaringDate(event.target.value)} />
          <StyledInputField id="caringInterval"
                            type="number"
                            value={plant.caringInterval}
                            $validInput={true}
                            placeholder="Caring Interval (in days)"
                            onChange={(event) => setCaringInterval(Number(event.target.value))} />
          <StyledPrimaryButton disabled={!nextWateringDate || !wateringInterval || !nextCaringDate || !wateringInterval}
                               type="submit">Save Changes</StyledPrimaryButton>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}