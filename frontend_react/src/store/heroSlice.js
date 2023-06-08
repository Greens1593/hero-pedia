import { createSlice } from "@reduxjs/toolkit";

const heroSlice = createSlice({
  name: "heroes",
  initialState: [],
  reducers: {
    replaceData: (state, action) => {
      return action.payload;
    },
  },
});

export const heroActions = heroSlice.actions;

export default heroSlice;
