import { PayloadAction } from "@reduxjs/toolkit";
import INoteState from "../states/interfaces";
import { ReducerTypes } from "./reducer-types";

const noteReducers = {
  [ReducerTypes.SET_NOTE]: (
    state: INoteState,
    action: PayloadAction<INote>
  ): void => {
    state.note = action.payload;
  },

  [ReducerTypes.UPDATE_NOTE_DATA]: (
    state: INoteState,
    action: PayloadAction<{ path: string; data: any }>
  ): void => {
    state.note = {
      ...state.note,
      [action.payload.path]: action.payload.data,
    };
  },
};

export default noteReducers;
