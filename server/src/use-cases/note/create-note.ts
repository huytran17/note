import { noteFs as NoteFs } from "../../data-access";
import INote from "../../interfaces/note";

interface ICreateNote {
  noteDetails: Partial<INote>;
}

export type CreateNote = ({ noteDetails }: ICreateNote) => Promise<void>;

export default function makeCreateNote({
  noteFs,
}: {
  noteFs: typeof NoteFs;
}): CreateNote {
  return async function createNote({ noteDetails }) {
    try {
      return await noteFs.insert({ noteDetails });
    } catch (error) {
      console.error(error);
    }
  };
}
