import { FastifyReply } from "fastify";
import { IResultOperation } from "../../../models/Interfaces/IResultOperations";

export const return404 = (response: FastifyReply) => {
  return response.code(404).send({
    isSuccessful: false,
    message: "data not exist",
    data: "resource not found",
  } as IResultOperation);
};
