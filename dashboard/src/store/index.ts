import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "@/store/note";

const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
