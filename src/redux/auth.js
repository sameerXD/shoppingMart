import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: ""
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuthTokenAndRole: (state, action) => {
      state.accessToken = action.accessToken;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addAuthTokenAndRole } = counterSlice.actions;

export default counterSlice.reducer;
