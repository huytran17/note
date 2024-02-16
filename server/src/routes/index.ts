import { Router } from "express";
import noteRouter from "./note";

const appRouter = Router();

appRouter.use("/note", noteRouter);

export default appRouter;
