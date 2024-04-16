export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Plant = {
  plantId: number;
  plantName:string;
  species: string;
  careInstructions: string;
  lastWateringDate: string;
  wateringInterval: number;
  nextWateringDate: string;
  lastCaringDate: string;
  caringInterval: number;
  nextCaringDate: string;
  owner: number;
};