import { RootState } from "@/store";

const noteSelectors = {
  note: (state: RootState) => state.note.note,
};

export default noteSelectors;
