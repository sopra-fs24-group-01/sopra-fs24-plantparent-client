import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getAllUsers, getUserByUsername, login } from "../service/userService";
import { User } from "../types";

interface IUserState {
  entities: any[];
  loggedInUser: User | null;
  status: string;
  error: null | any;
}

const initialState: IUserState = {
  entities: [],
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await getAllUsers();
});

export const fetchUserByUsername = createAsyncThunk(
  "users/fetchUserByUsername",
  async (username: string) => {
    return await getUserByUsername(username);
  },
);

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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, { payload }) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.entities = payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchUserByUsername.fulfilled, (state, { payload }) => {
        state.loggedInUser = payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export const {} = usersSlice.actions;


export default usersSlice.reducer;

interface RootState {
  users: ReturnType<typeof usersSlice.reducer>;
}

export const selectAllUsers = (state: RootState) => state.users.entities;

export const selectUserById = (state: RootState, id: number) =>
  state.users.entities.find((user) => user.id === id);

export const selectLoggedInUser = (state: RootState) => state.users.loggedInUser;

export const userError = (state: RootState) => state.users.error;
