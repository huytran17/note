import { noteFs as NoteFs } from "../../data-access";
import INote from "../../interfaces/note";

interface IGetById {
  _id: string;
}

export type GetById = ({ _id }: IGetById) => Promise<INote>;

export default function makeGetById({
  noteFs,
}: {
  noteFs: typeof NoteFs;
}): GetById {
  return async function getById({ _id }) {
    try {
      return await noteFs.findById({ _id });
    } catch (error) {
      console.error(error);
    }
  };
}
