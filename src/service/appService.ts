import { Plant, PlantFull, User, UserSimple } from "../types";

const baseurl = process.env.REACT_APP_BACKEND_BASEURL;

export function login(user: { username: string, password: string }): Promise<User> {
  return fetch(baseurl + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(response => {

      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function getUserById(userId: number): Promise<User> {
  return fetch(baseurl + "users/" + userId)
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
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
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function updateUser(user: UserSimple): Promise<User> {
  const url = `${baseurl}users/${user.id}`;

  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    // Stringify only the relevant parts of the user object
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
    }),
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}


export function getAllUsers(): Promise<User[]> {
  return fetch(baseurl + "users")
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
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
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
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
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function deletePlantById(plantId: number) {
  return fetch(baseurl + "plants/" + plantId, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function getPlantById(plantId: number): Promise<PlantFull> {
  return fetch(baseurl + "plants/" + plantId)
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function waterPlant(plantId: number) {
  return fetch(baseurl + "plants/" + plantId + "/water", {
    method: "PUT",
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function careForPlant(plantId: number) {
  return fetch(baseurl + "plants/" + plantId + "/care", {
    method: "PUT",
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function addCaretaker(plantId: number, userId: number) {
  return fetch(baseurl + "plants/" + plantId + "/caretakers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "caretakerId": userId }),
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function removeCaretaker(plantId: number, userId: number) {
  return fetch(baseurl + "plants/" + plantId + "/caretakers/" + userId, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function getAllPlantsOwned(userId: number): Promise<PlantFull[]> {
  return fetch(baseurl + "plants/owned?ownerId=" + userId)
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}

export function getAllPlantsCaredFor(userId: number): Promise<PlantFull[]> {
  return fetch(baseurl + "plants/caredFor?careTakerId=" + userId)
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      } else {
        return response.json();
      }
    });
}