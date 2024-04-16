import { Plant } from "../types";

const mockPlant1: Plant = {
  plantId: 1,
  plantName: "Plant1",
  species: "I am a really special plant. My species is: SpecialSpecies. I love water and sun, and get upset when my needs are not met... Beware!",
  careInstructions: "Water 2X a week, and fertilizer once a month.",
  lastWateringDate: "2024-04-06",
  wateringInterval: 3.5,
  nextWateringDate: "2024-04-10",
  lastCaringDate: "2024-03-26",
  caringInterval: 30,
  nextCaringDate: "2024-04-26",
  owner: 1,
};

const mockPlant2: Plant = {
  plantId: 2,
  plantName: "Plant2",
  species: "I am an ordinary plant. My species is: OrdinarySpecies. I am easy to take care of, and I am very low maintenance. I am the perfect plant for beginners!",
  careInstructions: "Water 1X a week, and fertilizer twice a year.",
  lastWateringDate: "2024-04-07",
  wateringInterval: 7,
  nextWateringDate: "2024-06-14",
  lastCaringDate: "2024-03-26",
  caringInterval: 182.5,
  nextCaringDate: "2024-09-25",
  owner: 1,
};

const mockPlant3: Plant = {
  plantId: 3,
  plantName: "Plant3",
  species: "I am a tropical plant. My species is: TropicalSpecies. I love humidity and indirect light.",
  careInstructions: "Water 2X a week, and mist daily.",
  lastWateringDate: "2024-04-08",
  wateringInterval: 3.5,
  nextWateringDate: "2024-04-12",
  lastCaringDate: "2024-03-28",
  caringInterval: 30,
  nextCaringDate: "2024-04-28",
  owner: 1,
};

const mockPlant4: Plant = {
  plantId: 4,
  plantName: "Plant4",
  species: "I am a desert plant. My species is: DesertSpecies. I love sunlight and don't need much water.",
  careInstructions: "Water 1X a month, and place in direct sunlight.",
  lastWateringDate: "2024-04-01",
  wateringInterval: 30,
  nextWateringDate: "2024-05-01",
  lastCaringDate: "2024-03-01",
  caringInterval: 365,
  nextCaringDate: "2025-03-01",
  owner: 1,
};

const mockPlant5: Plant = {
  plantId: 5,
  plantName: "Plant5",
  species: "I am a vine plant. My species is: VineSpecies. I love climbing and need a support to grow.",
  careInstructions: "Water 1X a week, and provide a trellis or support.",
  lastWateringDate: "2024-04-07",
  wateringInterval: 7,
  nextWateringDate: "2024-04-14",
  lastCaringDate: "2024-03-14",
  caringInterval: 30,
  nextCaringDate: "2024-04-14",
  owner: 1,
};

const mockPlant6: Plant = {
  plantId: 6,
  plantName: "Plant6",
  species: "I am a flowering plant. My species is: FloweringSpecies. I bloom beautiful flowers when taken care of properly.",
  careInstructions: "Water 2X a week, and provide plenty of indirect light.",
  lastWateringDate: "2024-04-08",
  wateringInterval: 3.5,
  nextWateringDate: "2024-04-12",
  lastCaringDate: "2024-03-28",
  caringInterval: 30,
  nextCaringDate: "2024-04-28",
  owner: 1,
};

const mockPlants: Plant[] = [mockPlant1, mockPlant2, mockPlant3, mockPlant4, mockPlant5, mockPlant6];


const baseurl = process.env.REACT_APP_USER_BASEURL;

export function getAllPlants(): Promise<Plant[]> {
  return fetch(baseurl + "plants/")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockPlants);
        }, 1000); // Simulate a 1 second delay
      });
    });
}

export function createPlant(plant: Plant) {
  return fetch(baseurl + "plants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plant),
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

export function getPlant(plantId: string): Promise<Plant> {
  return fetch(baseurl + "users/" + plantId)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getPlantByPlantName(plantName: string): Promise<Plant> {
  return fetch(baseurl + "plants/plantName/" + plantName)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function waterPlant(plantId: number) {
  return fetch(baseurl + "plants/" + plantId + "/water", {
    method: "POST",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function careForPlant(plantId: number) {
  return fetch(baseurl + "plants/" + plantId + "/care", {
    method: "POST",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch(error => {
      console.log(error);
    });
}