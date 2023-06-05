import { configureStore } from "@reduxjs/toolkit";
import heroSlice from "./heroSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    hero: heroSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
