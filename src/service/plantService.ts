import { Plant } from "../types";

const baseurl = process.env.REACT_APP_USER_BASEURL;

export function getAllPlants(): Promise<Plant[]> {
  return fetch(baseurl + "plants/")
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.log(error)
    })
}

export function createPlant(plant: Plant) {
  return fetch(baseurl + "plants", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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