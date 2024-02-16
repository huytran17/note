import { HttpStatusCode } from "../../config/constants/http-status-code";
import { GetAllNotes } from "../../use-cases/note/get-all-notes";

export default function makeGetAllNotesController({
  getAllNotes,
}: {
  getAllNotes: GetAllNotes;
}) {
  return async function getAllNotesController(httpRequest: Request & {}) {
    const httpHeaders = {
      "Content-Type": "application/json",
    };

    try {
      const notes = await getAllNotes();

      return {
        httpHeaders,
        statusCode: HttpStatusCode.OK,
        body: notes,
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
