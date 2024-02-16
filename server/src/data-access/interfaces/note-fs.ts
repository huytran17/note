import INote from "../../interfaces/note";

export default interface INoteFs {
  findAll: () => Promise<INote[]>;
  findById: ({ _id }: { _id: string }) => Promise<INote>;
  insert: ({ noteDetails }: { noteDetails: Partial<INote> }) => Promise<void>;
  update: ({ noteDetails }: { noteDetails: Partial<INote> }) => Promise<void>;
  delete: ({ _id }: { _id: string }) => Promise<void>;
}
