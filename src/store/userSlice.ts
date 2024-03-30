import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit';
import { createUser, getAllUsers } from "../service/userService";
import { User } from "../types";

interface IUserState {
  entities: any[];
  loggedInUser: User | null;
  status: string;
}
const initialState: IUserState = {
  entities: [],
  loggedInUser: null,
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
  reducers: {
    registerUser: (state, action) => {
      const newUser = action.payload;
      createUser(newUser).then();
      state.loggedInUser = newUser;
    }
  },
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

export const {registerUser} = usersSlice.actions


export default usersSlice.reducer

interface RootState {
  users: ReturnType<typeof usersSlice.reducer>;
}

export const selectAllUsers = (state: RootState) => state.users.entities;

export const selectUserById = (state: RootState, id: number) =>
  state.users.entities.find((user) => user.id == id);
