import { noteFs } from "../../data-access";
import makeCreateNote from "./create-note";
import makeDeleteNote from "./delete-note";
import makeGetAlNotes from "./get-all-notes";
import makeGetById from "./get-by-id";
import makeUpdateNote from "./update-note";

const createNote = makeCreateNote({ noteFs });
const deleteNote = makeDeleteNote({ noteFs });
const getAllNotes = makeGetAlNotes({ noteFs });
const getById = makeGetById({ noteFs });
const updateNote = makeUpdateNote({ noteFs });

export default Object.freeze({
  createNote,
  deleteNote,
  getAllNotes,
  getById,
  updateNote,
});

export { createNote, deleteNote, getAllNotes, getById, updateNote };
