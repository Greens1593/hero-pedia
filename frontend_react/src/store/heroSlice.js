import { createSlice } from "@reduxjs/toolkit";

const heroSlice = createSlice({
  name: "hero",
  initialState: [],
  reducers: {
    addHero: (state, action) => {
      state.push(action.payload);
    },
    editHero: (state, action) => {
      state.map((hero) => {
        if (hero.id === action.payload.id) {
          return action.payload;
        }
        return hero;
      });
    },
    deleteHero: (state, action) => {
      state = state.filter((hero) => hero.id !== action.payload);
    },
  },
});

export const heroActions = heroSlice.actions;

export default heroSlice;
