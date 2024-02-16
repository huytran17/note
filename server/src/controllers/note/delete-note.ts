import { HttpStatusCode } from "../../config/constants/http-status-code";
import { DeleteNote } from "../../use-cases/note/delete-note";
import { GetById } from "../../use-cases/note/get-by-id";

export default function makeDeleteNoteController({
  getById,
  deleteNote,
}: {
  getById: GetById;
  deleteNote: DeleteNote;
}) {
  return async function deleteNoteController(
    httpRequest: Request & {
      context: { validated: {} };
    }
  ) {
    const httpHeaders = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <{ _id: string }>httpRequest?.context?.validated;

      const note = await getById({ _id });
      if (!note) {
        throw new Error(`Note by id ${_id} does not exist`);
      }

      await deleteNote({ _id });

      return {
        httpHeaders,
        statusCode: HttpStatusCode.OK,
        body: { _id },
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
