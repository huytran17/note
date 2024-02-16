import { noteFs as NoteFs } from "../../data-access";
import INote from "../../interfaces/note";

export type GetAllNotes = () => Promise<INote[]>;

export default function makeGetAlNotes({
  noteFs,
}: {
  noteFs: typeof NoteFs;
}): GetAllNotes {
  return async function getAllNotes() {
    try {
      return await noteFs.findAll();
    } catch (error) {
      console.error(error);
    }
  };
}
