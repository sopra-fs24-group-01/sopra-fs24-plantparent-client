import {createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import { getAllPlants } from "../service/plantService";

interface IPlantState {
  entities: any[];
  status: string;
}
const initialState: IPlantState = {
  entities: [],
  status: "idle"
};

export const fetchPlants = createAsyncThunk("plants/fetchPlants", async () => {

  return await getAllPlants();
})

export const plantsSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlants.pending, (state, {payload}) => {
        state.status = "loading"
      })
      .addCase(fetchPlants.fulfilled, (state, {payload}) => {
        state.status = "succeeded"
        state.entities = payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.status = "failed";
      })
  }
})

export default plantsSlice.reducer

interface RootState {
  plants: ReturnType<typeof plantsSlice.reducer>;
}

export const selectAllPlants = (state: RootState) => state.plants.entities;

export const selectPlantById = (state: RootState, id: number) =>
  state.plants.entities.find((plant) => plant.id === id);
