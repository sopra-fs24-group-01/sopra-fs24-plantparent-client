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
import { Plant, PlantFull, PlantSimple } from "../../types";
import { useAppSelector } from "../../hooks";
import { getStatus, selectLoggedInUser, selectPlantById } from "../../store/appSlice";
import { getPlantById, updatePlant } from "../../service/appService";


export default function EditPlant() {
  // get the logged in user from the store
  const user = useAppSelector(selectLoggedInUser);
  // get the status of the plants from the store
  const appStatus = useAppSelector(getStatus);

  // capture the plantId from the URL
  const { plantId } = useParams<{ plantId: string }>();

  const [plant, setPlant] = useState<PlantFull | null>(null);
  const [lastWateringDate, setLastWateringDate] = useState<string>("");
  const [lastCaringDate, setLastCaringDate] = useState<string>("");
  const [wateringInterval, setWateringInterval] = useState<number>(0);
  const [caringInterval, setCaringInterval] = useState<number>(0);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlant() {
      const fetchedPlant = await getPlantById(Number(plantId));
      setPlant(fetchedPlant);
      setLastWateringDate(fetchedPlant.nextWateringDate);
      setLastCaringDate(fetchedPlant.nextCaringDate);
      setWateringInterval(fetchedPlant.wateringInterval);
      setCaringInterval(fetchedPlant.caringInterval);
    }

    fetchPlant();
  }, [plantId]);

  async function doEditPlant(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lastWatering = new Date(lastWateringDate);
    lastWatering.setDate(lastWatering.getDate() + Number(wateringInterval));
    const nextWateringDate = lastWatering.toISOString().split("T")[0];

    const lastCaring = new Date(lastCaringDate);
    lastCaring.setDate(lastCaring.getDate() + Number(caringInterval));
    const nextCaringDate = lastCaring.toISOString().split("T")[0];

    const new_plant: PlantSimple = {
      plantId: Number(plantId),
      plantName: plant.plantName,
      species: plant.species,
      careInstructions: plant.careInstructions,
      lastWateringDate: lastWateringDate,
      wateringInterval: wateringInterval,
      nextWateringDate: nextWateringDate,
      lastCaringDate: lastCaringDate,
      caringInterval: caringInterval,
      nextCaringDate: nextCaringDate,
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
          <StyledForm onSubmit={doEditPlant}>
            <label htmlFor="lastWateringDate">Last Watering Date</label>
            <StyledInputField id="lastWateringDate"
              type="date"
              value={lastWateringDate}
              $validInput={true}
              placeholder="Last Watering Date"
              onChange={(event) => setLastWateringDate(event.target.value)} />
            <label htmlFor="wateringInterval">Watering Interval</label>
            <StyledInputField id="wateringInterval"
              type="number"
              value={wateringInterval}
              $validInput={true}
              placeholder="Watering Interval (in days)"
              onChange={(event) => setWateringInterval(Number(event.target.value))} />
            <label htmlFor="lastCaringDate">Last Caring Date</label>
            <StyledInputField id="lastCaringDate"
              type="date"
              value={lastCaringDate}
              $validInput={true}
              placeholder="Last Caring Date"
              onChange={(event) => setLastCaringDate(event.target.value)} />
            <label htmlFor="caringInterval">Caring Interval</label>
            <StyledInputField id="caringInterval"
              type="number"
              value={caringInterval}
              $validInput={true}
              placeholder="Caring Interval (in days)"
              onChange={(event) => setCaringInterval(Number(event.target.value))} />
            <StyledPrimaryButton disabled={
              (lastWateringDate === "" || wateringInterval === null || lastCaringDate === "" || false)
              || (lastWateringDate === plant.lastWateringDate && wateringInterval === plant.wateringInterval && lastCaringDate === plant.lastCaringDate && caringInterval === plant.caringInterval)}
            type="submit">Save Changes</StyledPrimaryButton>
            <StyledPrimaryButton onClick={() => navigate("/plant/" + plantId)}>Cancel</StyledPrimaryButton>
            {error && <StyledError>{error}</StyledError>}
          </StyledForm>
        </StyledLoginContainer>
      </StyledMainContainer>
  );
}