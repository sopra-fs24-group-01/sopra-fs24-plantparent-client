import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit';
import { getAllUsers } from "../service/userService";

interface IUserState {
  entities: any[];
  status: string;
}
const initialState: IUserState = {
  entities: [],
  status: 'idle'
};
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {

  const data = await getAllUsers();
  console.log(data);
  return data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, {payload}) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, {payload}) => {
        state.status = 'succeeded'
        state.entities = payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
      })
  }
})

export default usersSlice.reducer

interface RootState {
  users: ReturnType<typeof usersSlice.reducer>;
}

export const selectAllUsers = (state: RootState) => state.users.entities;

export const selectUserById = (state: RootState, id: number) =>
  state.users.entities.find((user) => user.id == id);
