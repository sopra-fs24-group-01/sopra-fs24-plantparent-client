import { Plant } from "../types";

const mockPlant1: Plant = {
  plantName: "Plant",
  species: "I am a really special plant. My species is: SpecialSpecies. I love water and sun, and get upset when my needs are not met... Beware!",
  careInstructions: "Water 2X a week, and fertilizer once a month.",
  lastWateringDate: "2024-04-06",
  wateringInterval: 3.5,
  nextWateringDate: "2024-04-10"
};

const mockPlant2: Plant = {
  plantName: "Plant2",
  species: "I am an ordinary plant. My species is: OrdinarySpecies. I am easy to take care of, and I am very low maintenance. I am the perfect plant for beginners!",
  careInstructions: "Water 1X a week, and fertilizer twice a year.",
  lastWateringDate: "2024-04-07",
  wateringInterval: 7,
  nextWateringDate: "2024-06-14"
};


const baseurl = process.env.REACT_APP_USER_BASEURL;

export function getAllPlants(): Promise<Plant[]> {
  return fetch(baseurl + "plants/")
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.log(error)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([mockPlant1, mockPlant2]);
        }, 1000); // Simulate a 1 second delay
      });
    })
}

export function createPlant(plant: Plant) {
  return fetch(baseurl + "plants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(plant)
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error)
    });
}

export function getPlant(plantId: string): Promise<Plant> {
  return fetch(baseurl + "users/" + plantId)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.log(error);
    });
}

export function getPlantByPlantName(plantName: string): Promise<Plant> {
  return fetch(baseurl + "plants/plantName/" + plantName)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.log(error);
    });
}