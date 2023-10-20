import { FastifyReply } from "fastify";
import { IResultOperation } from "../../../models/Interfaces/IResultOperations";
import { logger } from "../logger/logger";

export const return500 = (
  response: FastifyReply,
  occurredPlace: string,
  errorMessage: any,
) => {
  logger(occurredPlace, 500, `An error occurred. Error is: ${errorMessage}`, 8);
  return response.code(500).send({
    isSuccessful: false,
    message: "Internal error occurred",
    data: "Check logs for more information",
  } as IResultOperation);
};
