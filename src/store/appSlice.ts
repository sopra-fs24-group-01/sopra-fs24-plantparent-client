import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { login } from "../service/appService";
import { Plant, User } from "../types";


interface IUserState {
  plantsOwned: Plant[];
  plantsCaredFor: Plant[];
  loggedInUser: User | null;
  status: string;
  loggedInDate: Date;
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

export const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.loggedInDate = new Date();
        state.loggedInUser = payload;
        state.plantsOwned = payload.plantsOwned;
        state.plantsCaredFor = payload.plantsCaredFor;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = appSlice.actions;

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

export const selectPlantById = (state: RootState, id: number) => {
  return selectAllPlants(state).find((plant) => plant.id === id);
}

export const logOutUser = (state: RootState) => {
  state.appData.loggedInUser = null;
  state.appData.plantsOwned = [];
  state.appData.plantsCaredFor = [];
  state.appData.loggedInDate = null;
}

export const getLoggedInDate = (state: RootState) => state.appData.loggedInDate;


export const getStatus = (state: RootState) => state.appData.status;
export const error = (state: RootState) => state.appData.error;