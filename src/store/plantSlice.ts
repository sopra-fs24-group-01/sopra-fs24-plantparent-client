import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { getAllPlants } from "../service/plantService";

interface IPlantState {
  entities: any[];
  status: string;
}

const initialState: IPlantState = {
  entities: [],
  status: "idle",
};

export const fetchPlants = createAsyncThunk("plants/fetchPlants", async () => {
  return await getAllPlants();
});

// export const fetchPlantOfUser = createAsyncThunk("plants/fetchPlantOfUser", async (userId: number) => {
//   console.log(userId);
//   return await getPlantsForUser(userId);
// });

export const plantsSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlants.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(fetchPlants.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.entities = payload;
        console.log("Plants loaded");
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default plantsSlice.reducer;

interface RootState {
  plants: ReturnType<typeof plantsSlice.reducer>;
}

export const selectAllPlants = createSelector(
  [(state: RootState) => state.plants.entities],
  (entities) => {
    return [...entities].sort((a, b) => {
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
  console.log(state.plants.entities);
  return state.plants.entities.find((plant) => plant.plantId === id);
}