import { HttpStatusCode } from "../../config/constants/http-status-code";
import INote from "../../interfaces/note";
import { GetById } from "../../use-cases/note/get-by-id";
import { UpdateNote } from "../../use-cases/note/update-note";

export default function makeUpdateNoteController({
  getById,
  updateNote,
}: {
  getById: GetById;
  updateNote: UpdateNote;
}) {
  return async function updateNoteController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const httpHeaders = {
      "Content-Type": "application/json",
    };

    try {
      const noteDetails = <Partial<INote>>httpRequest?.context?.validated;

      const note = await getById({ _id: noteDetails._id });
      if (!note) {
        throw new Error(`Note by id ${noteDetails._id} does not exist`);
      }

      await updateNote({ noteDetails });

      return {
        httpHeaders,
        statusCode: HttpStatusCode.OK,
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
