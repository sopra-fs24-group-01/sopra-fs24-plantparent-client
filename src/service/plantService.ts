import { Plant } from "../types";

const mockPlant1: Plant = {
  plantName: "Plant",
  species: "Species",
  careInstructions: "Care Instructions",
  lastWateringDate: "2024-04-06",
  wateringInterval: 3,
  nextWateringDate: "2024-04-10"
};

const mockPlant2: Plant = {
  plantName: "Plant2",
  species: "Species2",
  careInstructions: "Care Instructions2",
  lastWateringDate: "2024-04-06",
  wateringInterval: 3,
  nextWateringDate: "2024-04-10"
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