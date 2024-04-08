export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Plant = {
  plantName:string;
  species: string;
  careInstructions: string;
  lastWateringDate: string;
  wateringInterval: number;
  nextWateringDate: string;
};