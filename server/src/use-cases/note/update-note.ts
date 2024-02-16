import { noteFs as NoteFs } from "../../data-access";
import INote from "../../interfaces/note";

interface IUpdateNote {
  noteDetails: Partial<INote>;
}

export type UpdateNote = ({ noteDetails }: IUpdateNote) => Promise<void>;

export default function makeUpdateNote({
  noteFs,
}: {
  noteFs: typeof NoteFs;
}): UpdateNote {
  return async function updateNote({ noteDetails }) {
    try {
      return await noteFs.update({ noteDetails });
    } catch (error) {
      console.error(error);
    }
  };
}
