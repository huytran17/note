import { NextFunction, Request, Response } from "express";
import Validator, { Rules } from "validatorjs";
import { HttpStatusCode } from "../constants/http-status-code";

export default function makeExpressValidator(rules: Rules) {
  return function (request: Request, response: Response, next: NextFunction) {
    const data = {
      ...request.body,
      ...request.params,
      ...request.query,
    };

    const validation = new Validator(data, rules);

    if (validation.passes()) {
      return next();
    }

    response.set("Content-Type", "application/json");
    response.type("json");
    response
      .status(HttpStatusCode.BAD_REQUEST)
      .send(JSON.stringify(validation.errors));
  };
}
