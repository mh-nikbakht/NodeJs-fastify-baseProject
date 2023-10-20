import { FastifyReply } from "fastify";
import { IResultOperation } from "../../../models/Interfaces/IResultOperations";

export const return201 = (response: FastifyReply) => {
  return response.code(201).send({
    isSuccessful: false,
    message: "data created successfully",
    data: "اطلاعات با موفقیت ثبت شد",
  } as IResultOperation);
};
