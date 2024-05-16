import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getPlantById,
  login,
  createUser,
  getAllPlantsCaredFor,
  getAllPlantsOwned, updateUser, getOwnedSpaces, getMembershipSpaces,
} from "../service/appService";
import { Plant, PlantFull, Space, User, UserSimple } from "../types";


interface IUserState {
  plantsOwned: PlantFull[];
  plantsCaredFor: PlantFull[];
  loggedInUser: User | null;
  status: string;
  loggedInDate: string;
  plantWatered: number;
  plantCaredFor: number;
  spaces: Space[];
  error: null | any;
}

const initialState: IUserState = {
  plantsOwned: [],
  plantsCaredFor: [],
  loggedInUser: null,
  loggedInDate: null,
  spaces: [],
  plantWatered: 0,
  plantCaredFor: 0,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (newUser: User, thunkAPI) => {
    try {
      return await createUser(newUser);
    } catch (err) {
      console.log(err);

      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user: { username: string, password: string }, thunkAPI) => {
    try {
      return await login(user);
    } catch (err) {
      console.log(err);

      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const updateUserRedux = createAsyncThunk(
  "users/updateUser",
  async (user: UserSimple, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const updatedUser =  await updateUser(user);
      const { fullPlantsOwned, fullPlantsCaredFor, plantWatered, plantCaredFor } = updatePlantsOfUser(updatedUser, state);

      return { ...updatedUser, plantsOwned: fullPlantsOwned, plantsCaredFor: fullPlantsCaredFor, plantWatered, plantCaredFor };
    } catch (err) {
      console.log(err);

      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const updatePlantInPlantStore = createAsyncThunk(
  "plants/updatePlant",
  async ({plantId, animate}: {plantId: number, animate: boolean}, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const updatedPlant = await getPlantById(plantId);
    const { plant, plantWatered, plantCaredFor } = updatePlant(updatedPlant, state, animate);

    return { plant, plantWatered, plantCaredFor };
  },
);

export const updateGetAllPlantsOwned = createAsyncThunk(
  "plants/updateGetAllPlantsOwned",
  async (userId: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const plants = await getAllPlantsOwned(userId);
    const { newPlants, plantWatered, plantCaredFor } = updatePlants(plants, state);

    return { newPlants, plantWatered, plantCaredFor };
  },
);

export const updateGetAllPlantsCaredFor = createAsyncThunk(
  "plants/updateGetAllPlantsCaredFor",
  async (userId: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const plants = await getAllPlantsCaredFor(userId);
    const { newPlants, plantWatered, plantCaredFor } = updatePlants(plants, state);

    return { newPlants, plantWatered, plantCaredFor };
  },
);

export const getSpaces = createAsyncThunk(
  "spaces/getSpaces",
  async (userId: number, thunkAPI) => {
    try {
      const ownedSpaces =  await getOwnedSpaces(userId);
      const memberSpaces =  await getMembershipSpaces(userId);

      return [...ownedSpaces, ...memberSpaces];
    } catch (err) {
      console.log(err);

      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPlantWatered: (state, action: PayloadAction<number>) => {
      state.plantWatered = action.payload;
    },
    resetPlantWatered: (state) => {
      state.plantWatered = 0;
    },
    resetPlantCaredFor: (state) => {
      state.plantCaredFor = 0;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, { payload }) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const date = new Date();
        state.loggedInDate = date.toISOString();
        state.plantWatered = 0;
        state.plantCaredFor = 0;
        state.loggedInUser = payload;
        state.plantsOwned = payload.plantsOwned;
        state.plantsCaredFor = payload.plantsCaredFor;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loginUser.pending, (state, { payload }) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const date = new Date();
        state.loggedInDate = date.toISOString();
        state.loggedInUser = payload;
        state.plantWatered = 0;
        state.plantCaredFor = 0;
        state.plantsOwned = plantToFullPlant(payload.plantsOwned, payload);
        state.plantsCaredFor = plantToFullPlant(payload.plantsCaredFor, payload);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserRedux.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.loggedInUser = payload;
        state.plantWatered = payload.plantWatered;
        state.plantCaredFor = payload.plantCaredFor;
        state.plantsOwned = payload.plantsOwned;
        state.plantsCaredFor = payload.plantsCaredFor;
        state.error = null;
      })
      .addCase(updatePlantInPlantStore.fulfilled, (state, { payload }) => {
        const newPlantsOwned = state.plantsOwned.map((plant) => {
          if (plant.plantId === payload.plant.plantId) {
            return payload.plant;
          } else {
            return plant;
          }
        });
        const newPlantsCaredFor = state.plantsCaredFor.map((plant) => {
          if (plant.plantId === payload.plant.plantId) {
            return payload.plant;
          } else {
            return plant;
          }
        });
        state.plantsOwned = newPlantsOwned;
        state.plantsCaredFor = newPlantsCaredFor;
        state.plantWatered = payload.plantWatered;
        state.plantCaredFor = payload.plantCaredFor;
        state.error = null;
        console.log("plant updated");
      })
      .addCase(updateGetAllPlantsOwned.fulfilled, (state, { payload }) => {
        state.plantsOwned = payload.newPlants;
        state.plantWatered = payload.plantWatered;
        state.plantCaredFor = payload.plantCaredFor;
        state.error = null;
      })
      .addCase(updateGetAllPlantsCaredFor.fulfilled, (state, { payload }) => {
        state.plantsCaredFor = payload.newPlants;
        state.plantWatered = payload.plantWatered;
        state.plantCaredFor = payload.plantCaredFor;
        state.error = null;
      })
      .addCase(getSpaces.fulfilled, (state, { payload }) => {
        state.spaces = payload;
        state.error = null;
      });
  },
});

function plantToFullPlant(plants: Plant[], user: User) {
  const fullPlants: PlantFull[] = plants.map((plant) => {
    return { ...plant, owner: user, caretakers: [] };
  });

  return fullPlants;
}

function updatePlantsOfUser(user: User, state: RootState) {
  let plantWatered = 0;
  let plantCaredFor = 0;
  const fullPlantsOwned: PlantFull[] = user.plantsOwned.map((plant) => {
    const oldPlant = selectPlantById(state, plant.plantId);
    if (oldPlant && oldPlant.lastWateringDate !== plant.lastWateringDate) {
      plantWatered = plant.plantId;
    }
    if (oldPlant && oldPlant.lastCaringDate !== plant.lastCaringDate) {
      plantCaredFor = plant.plantId;
    }

    return { ...plant, owner: user, caretakers: [] };
  });
  const fullPlantsCaredFor: PlantFull[] = user.plantsCaredFor.map((plant) => {
    const oldPlant = selectPlantById(state, plant.plantId);
    if (oldPlant && oldPlant.lastWateringDate !== plant.lastWateringDate) {
      plantWatered = plant.plantId;
    }
    if (oldPlant && oldPlant.lastCaringDate !== plant.lastCaringDate) {
      plantCaredFor = plant.plantId;
    }

    return { ...plant, owner: user, caretakers: [] };
  });

  return { fullPlantsOwned, fullPlantsCaredFor, plantWatered, plantCaredFor };
}

function updatePlants(plants: PlantFull[], state: RootState) {
  let plantWatered = 0;
  let plantCaredFor = 0;
  const newPlants = plants.map((plant) => {
    const oldPlant = selectPlantById(state, plant.plantId);
    if (oldPlant && oldPlant.lastWateringDate !== plant.lastWateringDate) {
      plantWatered = plant.plantId;
    }
    if (oldPlant && oldPlant.lastCaringDate !== plant.lastCaringDate) {
      plantCaredFor = plant.plantId;
    }

    return { ...plant };
  });

  return { newPlants, plantWatered, plantCaredFor };
}

function updatePlant(plant: PlantFull, state: RootState, animate: boolean) {
  let plantWatered = 0;
  let plantCaredFor = 0;
  const oldPlant = selectPlantById(state, plant.plantId);
  if (animate && oldPlant && oldPlant.lastWateringDate !== plant.lastWateringDate) {
    plantWatered = plant.plantId;
  }
  if (animate && oldPlant && oldPlant.lastCaringDate !== plant.lastCaringDate) {
    plantCaredFor = plant.plantId;
  }

  return { plant, plantWatered, plantCaredFor };
}

export const { clearError, resetPlantWatered, resetPlantCaredFor } = appSlice.actions;

export default appSlice.reducer;

interface RootState {
  appData: ReturnType<typeof appSlice.reducer>;
}

export const selectLoggedInUser = (state: RootState) => state.appData.loggedInUser;

export const selectAllPlants = createSelector(
  [
    (state: RootState) => state.appData.plantsOwned,
    (state: RootState) => state.appData.plantsCaredFor,
  ],
  (plantsOwned, plantsCaredFor) => {
    return [...plantsOwned, ...plantsCaredFor].sort((a, b) => {
      const aNextCaringDate = new Date(a.nextCaringDate);
      const bNextCaringDate = new Date(b.nextCaringDate);
      const aNextWateringDate = new Date(a.nextWateringDate);
      const bNextWateringDate = new Date(b.nextWateringDate);
      if ((aNextCaringDate < bNextCaringDate) || (aNextWateringDate < bNextWateringDate)) {
        return -1;
      } else {
        return 1;
      }
    });
  });

export const selectOwnedPlants = createSelector(
  [
    (state: RootState) => state.appData.plantsOwned,
  ],
  (plantsOwned) => {
    return [...plantsOwned].sort((a, b) => {
      const aNextCaringDate = new Date(a.nextCaringDate);
      const bNextCaringDate = new Date(b.nextCaringDate);
      const aNextWateringDate = new Date(a.nextWateringDate);
      const bNextWateringDate = new Date(b.nextWateringDate);
      if ((aNextCaringDate < bNextCaringDate) || (aNextWateringDate < bNextWateringDate)) {
        return -1;
      } else {
        return 1;
      }
    });
  });

export const selectPlantById = (state: RootState, id: number) => {
  return selectAllPlants(state).find((plant) => plant.plantId === id);
};

export const logOutUser = (state: RootState) => {
  state.appData.loggedInUser = null;
  state.appData.plantsOwned = [];
  state.appData.plantsCaredFor = [];
  state.appData.loggedInDate = null;
};

export const getLoggedInDate = createSelector(
  [(state: RootState) => state.appData.loggedInDate],
  (loggedInDateString) => new Date(loggedInDateString),
);


export const getStatus = (state: RootState) => state.appData.status;

export const getPlantWatered = (state: RootState) => state.appData.plantWatered;

export const getPlantCaredFor = (state: RootState) => state.appData.plantCaredFor;

export const getSpacesOfUser = (state: RootState) => state.appData.spaces;

export const appError = (state: RootState) => state.appData.error;