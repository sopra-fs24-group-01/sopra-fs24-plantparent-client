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
  plantImageUrl: string;
};

export type PlantFull = {
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
  owner: User;
  caretakers: User[];
  plantImageUrl: string;
};

export type PlantSimple = {
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
  owner: UserSimple;
  caretakers: UserSimple[];
  plantImageUrl: string;
}

export type UserSimple = {
  id?: number;
  username: string;
  email: string;
  password: string;
};

export type Space = {
  spaceId?: number;
  spaceName: string;
  spaceOwner: User;
  plantsContained: Plant[];
  spaceMembers: User[];
}

export type SpaceSimple = {
  spaceId?: number;
  spaceName: string;
  spaceOwner: UserSimple;
  plantsContained: Plant[];
  spaceMembers: UserSimple[];
}