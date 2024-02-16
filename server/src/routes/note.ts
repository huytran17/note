import { Router } from "express";
import makeExpressCallback from "../config/middlewares/make-express-callback";
import makeExpressValidator from "../config/middlewares/make-express-validator";

import {
  createNoteController,
  deleteNoteController,
  getAllNotesController,
  getNoteByIdController,
  updateNoteController,
} from "../controllers/note";

import {
  createNote,
  deleteNote,
  getNoteById,
  updateNote,
} from "../controllers/note/validator";

const noteRouter = Router();

noteRouter.post(
  "/create",
  makeExpressValidator(createNote),
  makeExpressCallback(createNoteController)
);

noteRouter.put(
  "/update",
  makeExpressValidator(updateNote),
  makeExpressCallback(updateNoteController)
);

noteRouter.delete(
  "/delete/:_id",
  makeExpressValidator(deleteNote),
  makeExpressCallback(deleteNoteController)
);

noteRouter.get("/", makeExpressCallback(getAllNotesController));

noteRouter.get(
  "/:_id",
  makeExpressValidator(getNoteById),
  makeExpressCallback(getNoteByIdController)
);

export default noteRouter;
