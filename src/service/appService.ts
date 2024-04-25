import { Plant, User } from "../types";

const baseurl = process.env.REACT_APP_BACKEND_BASEURL;

export function login(user: {username: string, password: string}): Promise<User> {
  return fetch(baseurl + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

export function createUser(user: User) {
  return fetch(baseurl + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("User already exists");
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
}

export function getAllUsers(): Promise<User[]> {
  return fetch(baseurl + "users")
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
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

export function updatePlant(plant: Plant) {
  return fetch(baseurl + "plants/" + plant.plantId, {
    method: "PUT",
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