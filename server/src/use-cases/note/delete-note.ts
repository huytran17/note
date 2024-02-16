import { noteFs as NoteFs } from "../../data-access";

interface IDeleteNote {
  _id: string;
}

export type DeleteNote = ({ _id }: IDeleteNote) => Promise<void>;

export default function makeDeleteNote({
  noteFs,
}: {
  noteFs: typeof NoteFs;
}): DeleteNote {
  return async function deleteNote({ _id }) {
    try {
      return await noteFs.delete({ _id });
    } catch (error) {
      console.error(error);
    }
  };
}
