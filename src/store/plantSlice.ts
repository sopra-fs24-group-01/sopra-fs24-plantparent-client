import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit';
import { createPlant, getAllPlants, getPlantByPlantName } from "../service/plantService";
import { Plant } from "../types";

interface IPlantState {
  entities: any[];
  loggedInPlant: Plant | null;
  status: string;
}
const initialState: IPlantState = {
  entities: [],
  loggedInPlant: null,
  status: 'idle'
};
export const fetchPlants = createAsyncThunk('plants/fetchPlants', async () => {

  const data = await getAllPlants();
  console.log(data);
  return data
})

export const fetchPlantByPlantName = createAsyncThunk(
  'plants/fetchPlantByPlantName',
  async (plantName: string) => {
    return await getPlantByPlantName(plantName);
  }
);

export const plantsSlice = createSlice({
  name: 'plants',
  initialState,
  reducers: {
    registerPlant: (state, action) => {
      const newPlant = action.payload;
      createPlant(newPlant).then();
      state.loggedInPlant = newPlant;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlants.pending, (state, {payload}) => {
        state.status = 'loading'
      })
      .addCase(fetchPlants.fulfilled, (state, {payload}) => {
        state.status = 'succeeded'
        state.entities = payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(fetchPlantByPlantName.fulfilled, (state, {payload}) => {
        state.loggedInPlant = payload;
      })
  }
})

export const {registerPlant} = plantsSlice.actions


export default plantsSlice.reducer

interface RootState {
  plants: ReturnType<typeof plantsSlice.reducer>;
}

export const selectAllPlants = (state: RootState) => state.plants.entities;

export const selectPlantById = (state: RootState, id: number) =>
  state.plants.entities.find((plant) => plant.id === id);
