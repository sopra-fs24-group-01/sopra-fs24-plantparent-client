import { User } from "../types";

const baseurl = process.env.REACT_APP_USER_BASEURL;

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

export function getUser(userId: string): Promise<User> {
  return fetch(baseurl + "users/" + userId)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getUserByUsername(username: string): Promise<User> {
  return fetch(baseurl + "users/username/" + username)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

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