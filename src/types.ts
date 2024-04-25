export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
  plantsOwned: Plant[];
  plantsCaredFor: Plant[];
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
};