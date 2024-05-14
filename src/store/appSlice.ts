import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getPlantById,
  login,
  createUser,
  getAllPlantsCaredFor,
  getAllPlantsOwned, updateUser,
} from "../service/appService";
import { Plant, PlantFull, User, UserSimple } from "../types";


interface IUserState {
  plantsOwned: PlantFull[];
  plantsCaredFor: PlantFull[];
  loggedInUser: User | null;
  status: string;
  loggedInDate: string;
  error: null | any;
}

const initialState: IUserState = {
  plantsOwned: [],
  plantsCaredFor: [],
  loggedInUser: null,
  loggedInDate: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (newUser: User, { rejectWithValue }) => {
    try {
      return await createUser(newUser);
    } catch (err) {
      console.log(err);

      return rejectWithValue(err.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user: { username: string, password: string }, { rejectWithValue }) => {
    try {
      return await login(user);
    } catch (err) {
      console.log(err);

      return rejectWithValue(err.message);
    }
  },
);

export const updateUserRedux = createAsyncThunk(
  "users/updateUser",
  async (user: UserSimple, { rejectWithValue }) => {
    try {
      return await updateUser(user);
    } catch (err) {
      console.log(err);

      return rejectWithValue(err.message);
    }
  },
);

export const updatePlantInPlantStore = createAsyncThunk(
  "plants/updatePlant",
  async (plantId: number) => {
    return await getPlantById(plantId);
  },
);

export const updateGetAllPlantsOwned = createAsyncThunk(
  "plants/updateGetAllPlantsOwned",
  async (userId: number) => {
    return await getAllPlantsOwned(userId);
  },
);

export const updateGetAllPlantsCaredFor = createAsyncThunk(
  "plants/updateGetAllPlantsCaredFor",
  async (userId: number) => {
    return await getAllPlantsCaredFor(userId);
  },
);

export const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
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
        const fullPlantsOwned: PlantFull[] = payload.plantsOwned.map((plant) => {
          return {...plant, owner: payload, caretakers: []};
        })
        const fullPlantsCaredFor: PlantFull[] = payload.plantsCaredFor.map((plant) => {
          return {...plant, owner: payload, caretakers: []};
        })
        state.plantsOwned = fullPlantsOwned;
        state.plantsCaredFor = fullPlantsCaredFor;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserRedux.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        console.log(payload);
        state.loggedInUser = payload;
        const fullPlantsOwned: PlantFull[] = payload.plantsOwned.map((plant) => {
          return {...plant, owner: payload, caretakers: []};
        })
        const fullPlantsCaredFor: PlantFull[] = payload.plantsCaredFor.map((plant) => {
          return {...plant, owner: payload, caretakers: []};
        })
        state.plantsOwned = fullPlantsOwned;
        state.plantsCaredFor = fullPlantsCaredFor;
        state.error = null;
      })
      .addCase(updatePlantInPlantStore.fulfilled, (state, { payload }) => {
        const newPlantsOwned = state.plantsOwned.map((plant) => {
          if (plant.plantId === payload.plantId) {
            return payload;
          } else {
            return plant;
          }
        });
        const newPlantsCaredFor = state.plantsCaredFor.map((plant) => {
          if (plant.plantId === payload.plantId) {
            return payload;
          } else {
            return plant;
          }
        });
        state.plantsOwned = newPlantsOwned;
        state.plantsCaredFor = newPlantsCaredFor;
        state.error = null;
        console.log("plant updated");
      })
      .addCase(updateGetAllPlantsOwned.fulfilled, (state, { payload }) => {
        state.plantsOwned = payload;
        state.error = null;
      })
      .addCase(updateGetAllPlantsCaredFor.fulfilled, (state, { payload }) => {
        state.plantsCaredFor = payload;
        state.error = null;
      });
  },
});

export const {clearError} = appSlice.actions;

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

export const appError = (state: RootState) => state.appData.error;