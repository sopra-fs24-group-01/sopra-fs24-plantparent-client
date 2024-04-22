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

  const [nextWateringDate, setNextWateringDate] = useState<string>("");
  const [nextCaringDate, setNextCaringDate] = useState<string>("");
  const [wateringInterval, setWateringInterval] = useState<number>(null);
  const [caringInterval, setCaringInterval] = useState<number>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if(plantStatus === "succeeded") {
      setNextWateringDate(plant.nextWateringDate);
      setNextCaringDate(plant.nextCaringDate);
      setWateringInterval(plant.wateringInterval);
      setCaringInterval(plant.caringInterval);
    }
  }, [plantStatus]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function doEditPlant() {
    console.log("Edit for plant with plant ID " + plantId);

    const new_plant: Plant = {
      plantId: Number(plantId),
      owner: plant.owner,
      plantName: plant.plantName,
      species: plant.species,
      careInstructions: plant.careInstructions,
      lastWateringDate: plant.lastWateringDate,
      wateringInterval: wateringInterval,
      nextWateringDate: nextWateringDate,
      lastCaringDate: plant.lastCaringDate,
      caringInterval: caringInterval,
      nextCaringDate: nextCaringDate,
      caretakers: plant.caretakers,
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
        <label htmlFor="nextWateringDate">Next Watering Date</label>
          <StyledInputField id="nextWateringDate"
                            type="date"
                            value={nextWateringDate}
                            $validInput={true}
                            placeholder="Next Watering Date"
                            onChange={(event) => setNextWateringDate(event.target.value)} />
        <label htmlFor="wateringInterval">Watering Interval</label>
          <StyledInputField id="wateringInterval"
                            type="number"
                            value={wateringInterval}
                            $validInput={true}
                            placeholder="Watering Interval (in days)"
                            onChange={(event) => setWateringInterval(Number(event.target.value))} />
          <label htmlFor="nextCaringDate">Next Caring Date</label>
          <StyledInputField id="nextCaringDate"
                            type="date"
                            value={nextCaringDate}
                            $validInput={true}
                            placeholder="Next Caring Date"
                            onChange={(event) => setNextCaringDate(event.target.value)} />
        <label htmlFor="caringInterval">Caring Interval</label>
          <StyledInputField id="caringInterval"
                            type="number"
                            value={caringInterval}
                            $validInput={true}
                            placeholder="Caring Interval (in days)"
                            onChange={(event) => setCaringInterval(Number(event.target.value))} />
          <StyledPrimaryButton disabled={!nextWateringDate || !wateringInterval || !nextCaringDate || !wateringInterval || user.id !== plant.owner}
                               type="submit">Save Changes</StyledPrimaryButton>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
      </StyledLoginContainer>
    </StyledMainContainer>
  );
}