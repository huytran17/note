import axios from "@/config/axios";
import { ActionTypes } from "./action-types";

const noteActions = {
  [ActionTypes.CREATE_NOTE]: (payload: Partial<INote>) => async () => {
    return await axios.post("/create", payload);
  },

  [ActionTypes.UPDATE_NOTE]: (payload: Partial<INote>) => async () => {
    return await axios.put("/update", payload);
  },

  [ActionTypes.DELETE_NOTE]: (payload: { _id: string }) => async () => {
    return await axios.delete(`/delete/${payload._id}`);
  },

  [ActionTypes.GET_NOTE_BY_ID]: (payload: { _id: string }) => async () => {
    return await axios.get(`/${payload._id}`);
  },

  [ActionTypes.GET_ALL_NOTES]: () => async () => {
    return await axios.get("/");
  },

  [ActionTypes.SET_NOTE]: (payload: INote) => ({
    type: ActionTypes.SET_NOTE,
    payload,
  }),

  [ActionTypes.UPDATE_NOTE_DATA]: (payload: { path: string; data: any }) => ({
    type: ActionTypes.UPDATE_NOTE_DATA,
    payload,
  }),
};

export default noteActions;
