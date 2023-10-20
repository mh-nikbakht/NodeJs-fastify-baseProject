import { FastifyReply } from "fastify";
import { IResultOperation } from "../../../models/Interfaces/IResultOperations";

export const return409 = (response: FastifyReply) => {
  return response.code(409).send({
    isSuccessful: false,
    message: "some data may exist",
    data: "مقادیر ورودی را کنترل کنید برخی از داده ها تکراری میباشد",
  } as IResultOperation);
};
