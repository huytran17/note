import { NextFunction, Request, Response } from "express";

type Controller = (httpRequest: any) => any;

export default function makeExpressCallback(controller: Controller) {
  return function (request: Request, response: Response, next: NextFunction) {
    const httpRequest = {
      context: {
        validated: {
          ...request.body,
          ...request.params,
          ...request.query,
        },
      },
      path: request.path,
      headers: {
        "Content-Type": request.get("Content-Type"),
        "User-Agent": request.get("User-Agent"),
        Referer: request.get("Referer"),
      },
    };

    controller(httpRequest)
      .then((res: any) => {
        if (res.headers) {
          response.set(res.headers);
        }

        response.type("json");
        response.status(res.statusCode).send(res.body);

        next();
      })
      .catch((error: any) => {
        response.status(error.statusCode).send(error.body);

        next(JSON.stringify(error));
      });
  };
}
