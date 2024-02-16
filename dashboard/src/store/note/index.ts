import noteReducers from "./reducers/reducers";
import initialNoteState from "./states/states";
import { Slice, createSlice } from "@reduxjs/toolkit";

export const noteSlice: Slice<typeof initialNoteState> = createSlice({
  name: "note",
  initialState: initialNoteState,
  reducers: noteReducers,
});

export const noteActions = noteSlice.actions;
export default noteSlice.reducer;
