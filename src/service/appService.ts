import { Plant, PlantFull, Space, SpaceSimple, User, UserSimple } from "../types";

const baseurl = process.env.REACT_APP_BACKEND_BASEURL;

/**************************************** USER STUFF ****************************************/
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
        return response.json().then(err => {
          console.log(err);
          throw new Error(err.message);
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


/****************************** PLANT STUFF ******************************/
export function createPlant(plant: Plant, spaceId?: number) {
  const url = spaceId ? baseurl + "plants?spaceId=" + spaceId : baseurl + "plants";
  console.log(url);

  return fetch(url, {
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


export function uploadImage(plantId: number, file: File) {
  // Create a new FormData instance
  const formData = new FormData();

  // Append the image file to the FormData instance
  formData.append("image", file);

  // Construct the URL
  const url = baseurl + "plants/" + plantId + "/image";

  return fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then(response => {
      if (response.ok) {

        return response;
      } else {

        return response.text().then(err => {
          throw new Error(err);
        });
      }
    });
}

/****************************** SPACE STUFF ******************************/
export function getSpace(spaceId: number): Promise<Space> {
  return fetch(baseurl + "spaces/" + spaceId)
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

export function createSpace(space: SpaceSimple) {
  return fetch(baseurl + "spaces", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(space)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          console.log(err);
          throw new Error(err.message);
        });
      } else {
        return response.json();
      }
    });
}

export function updateSpace(space: SpaceSimple) {
  return fetch(baseurl + "spaces/" + space.spaceId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spaceName: space.spaceName,
      spaceOwner: space.spaceOwner,
      plantsContained: space.plantsContained
    })
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

export function deleteSpace(spaceId: number) {
  return fetch(baseurl + "spaces/" + spaceId, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      }
    });
}

export function getAllPlantsOfSpace(spaceId: number): Promise<PlantFull[]> {
  return fetch(baseurl + "plants/space?spaceId=" + spaceId)
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

export function addUserToSpace(spaceId: number, userId: number) {
  return fetch(baseurl + "spaces/" + spaceId + "/members/" + userId, {
    method: "POST",
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      }
    });
}

export function removeUserFromSpace(spaceId: number, userId: number) {
  return fetch(baseurl + "spaces/" + spaceId + "/members/" + userId, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      }
    });
}

export function addPlantToSpace(spaceId: number, plantId: number) {
  return fetch(baseurl + "spaces/" + spaceId + "/plants/" + plantId, {
    method: "POST",
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.message);
        });
      }
    });
}

export function removePlantFromSpace(spaceId: number, plantId: number) {
  return fetch(baseurl + "spaces/" + spaceId + "/plants/" + plantId, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      }
    });
}

export function getOwnedSpaces(userId: number) {
  return fetch(baseurl + "spaces/owned?ownerId=" + userId)
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      }

      return response.json();
    });
}

export function getMembershipSpaces(userId: number) {
  return fetch(baseurl + "spaces/member?memberId=" + userId)
    .then(response => {
      if (!response.ok) {
        return response.text().then(err => {
          throw new Error(err);
        });
      }

      return response.json();
    });
}