import { FastifyReply } from "fastify";
import { IResultOperation } from "../../../models/Interfaces/IResultOperations";

export const returnUserNotFoundWithId = (response: FastifyReply) => {
  return response.code(404).send({
    isSuccessful: false,
    message: "user not exist",
    data: "کاربر مورد نظر وجود ندارد",
  } as IResultOperation);
};
