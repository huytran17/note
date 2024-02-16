import { HttpStatusCode } from "../../config/constants/http-status-code";
import INote from "../../interfaces/note";
import { CreateNote } from "../../use-cases/note/create-note";

export default function makeCreateNoteController({
  createNote,
}: {
  createNote: CreateNote;
}) {
  return async function createNoteController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const httpHeaders = {
      "Content-Type": "application/json",
    };

    try {
      const noteDetails = <Partial<INote>>httpRequest?.context?.validated;
      await createNote({ noteDetails });

      return {
        httpHeaders,
        statusCode: HttpStatusCode.CREATED,
        body: noteDetails,
      };
    } catch (error) {
      throw {
        httpHeaders,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: error.message,
      };
    }
  };
}
