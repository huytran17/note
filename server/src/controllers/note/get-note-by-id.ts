import { HttpStatusCode } from "../../config/constants/http-status-code";
import { GetById } from "../../use-cases/note/get-by-id";

export default function makeGetNoteByIdController({
  getById,
}: {
  getById: GetById;
}) {
  return async function getNoteByIdController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const httpHeaders = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <{ _id: string }>httpRequest?.context?.validated;

      const note = await getById({ _id });

      return {
        httpHeaders,
        statusCode: HttpStatusCode.OK,
        body: note,
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
