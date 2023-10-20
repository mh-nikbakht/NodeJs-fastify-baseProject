import { FastifyReply } from "fastify";
import { IResultOperation } from "../../../models/Interfaces/IResultOperations";

export const return400 = (response: FastifyReply) => {
  return response.code(400).send({
    isSuccessful: false,
    message: "check entered inputs",
    data: "مقادیر ورودی را کنترل کنید",
  } as IResultOperation);
};
