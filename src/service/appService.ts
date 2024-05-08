import { Plant, PlantFull, User, UserSimple } from "../types";

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

export function getUserById(userId: number): Promise<User> {
  return fetch(baseurl + "users/" + userId)
    .then(response => response.json())
    .then(data => {
      return data;
    })
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

export function updateUser(user: UserSimple) {
  // Ensure the URL is properly concatenated with the user ID
  const url = `${baseurl}users/${user.id}`;

  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    // Stringify only the relevant parts of the user object
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password
    })
  })
  .then(response => {
    // Check if the response status is 204 (No Content), indicating success
    if (response.status === 204) {
      console.log("Update successful");
      return;
    }
    // If not successful, convert response to JSON to read the error message
    return response.json().then(data => {
      throw new Error(data.message || "Failed to update user");
    });
  })
  .catch(error => {
    console.error("Error updating user:", error);
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

export function deletePlantById(plantId: number) {
  return fetch(baseurl + "plants/" + plantId, {
    method: "DELETE",
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
}

export function getPlantById(plantId: number): Promise<PlantFull> {
  return fetch(baseurl + "plants/" + plantId)
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
    method: "PUT",
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
    method: "PUT",
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function removeCaretaker(plantId: number, userId: number) {
  return fetch(baseurl + "plants/" + plantId + "/caretakers/" + userId, {
    method: "DELETE",
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