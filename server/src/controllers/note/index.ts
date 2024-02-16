import makeCreateNoteController from "./create-note";
import makeDeleteNoteController from "./delete-note";
import makeGetAllNotesController from "./get-all-notes";
import makeGetNoteByIdController from "./get-note-by-id";
import makeUpdateNoteController from "./update-note";

import {
  createNote,
  deleteNote,
  getAllNotes,
  getById,
  updateNote,
} from "../../use-cases/note";

const createNoteController = makeCreateNoteController({
  createNote,
});

const deleteNoteController = makeDeleteNoteController({
  getById,
  deleteNote,
});

const getAllNotesController = makeGetAllNotesController({ getAllNotes });

const getNoteByIdController = makeGetNoteByIdController({
  getById,
});

const updateNoteController = makeUpdateNoteController({
  getById,
  updateNote,
});

export default Object.freeze({
  createNoteController,
  deleteNoteController,
  getAllNotesController,
  getNoteByIdController,
  updateNoteController,
});

export {
  createNoteController,
  deleteNoteController,
  getAllNotesController,
  getNoteByIdController,
  updateNoteController,
};
