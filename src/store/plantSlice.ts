import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { getAllPlants, getPlantsForUser } from "../service/plantService";

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

export const fetchPlantOfUser = createAsyncThunk("plants/fetchPlantOfUser", async (userId: number) => {
  console.log(userId);
  return await getPlantsForUser(userId);
});

export const plantsSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlantOfUser.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(fetchPlantOfUser.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.entities = payload;
      })
      .addCase(fetchPlantOfUser.rejected, (state, action) => {
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

export const selectPlantById = (state: RootState, id: number) =>
  state.plants.entities.find((plant) => plant.id === id);
