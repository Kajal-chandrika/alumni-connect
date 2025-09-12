import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";

interface AuthState {
  user: User | null;
}

const stored = localStorage.getItem("alumni_user");
const initialState: AuthState = {
  user: stored ? JSON.parse(stored) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload)
        localStorage.setItem("alumni_user", JSON.stringify(action.payload));
      else localStorage.removeItem("alumni_user");
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("alumni_user");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
