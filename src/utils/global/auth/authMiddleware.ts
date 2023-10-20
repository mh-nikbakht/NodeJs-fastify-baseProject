import { FastifyRequest } from "fastify";
import { IPayload } from "../../../models/Interfaces/IPayload";
import { IResultOperation } from "../../../models/Interfaces/IResultOperations";
import { login } from "./login";
import { preparingAuthMiddleware } from "./preparingAuthMiddleware";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");

export default async function authPreHandler(
  request: FastifyRequest,
  reply: any,
  done: (err?: Error) => void,
) {
  console.log("here");
  try {
    const auth = request.headers.authorization as string;
    console.log("auth", auth);
    const token = auth.split(" ")[1];
    const payload: IPayload = await jwt.verify(token, process.env.SECRET_TOKEN);
    const loginPreparation = await preparingAuthMiddleware(
      payload.userId,
      token,
      request.routerPath,
    );
    const IsRestrictToken = loginPreparation.IsRestrictToken;
    //#region check refresh token and block token
    if (IsRestrictToken.isSuccessful === false) {
      if (IsRestrictToken.data === "REFRESH") {
        //login method must be here
        const loginToken = await login(payload.userId);
        if (loginToken.isSuccessful === false) {
          return reply.code(403).send({
            isSuccessful: false,
            message: "ACCESS_DENIED",
            data: "ACCESS_DENIED",
          } as IResultOperation);
        } else {
          return reply.code(200).send({
            isSuccessful: true,
            message: "REFRESH_TOKEN",
            data: loginToken.data,
          } as IResultOperation);
        }
      }
      if (IsRestrictToken.data === "BLOCK") {
        return reply.code(403).send({
          isSuccessful: false,
          message: "ACCESS_DENIED",
          data: "ACCESS_DENIED",
        } as IResultOperation);
      }
    }
    //#endregion check refresh token and block token

    //check user roles
    const host = request.hostname;
    const validHosts = loginPreparation.validHosts;
    if (!validHosts.includes(host)) {
      return reply.code(403).send({
        isSuccessful: false,
        message: "ACCESS_DENIED",
        data: "ACCESS_DENIED",
      } as IResultOperation);
    }
    const isUserValidToProcessRes = loginPreparation.isUserValidToProcessRes;
    if (isUserValidToProcessRes.isSuccessful === false) {
      console.log("isUserValidToProcessRes", isUserValidToProcessRes);
      return reply.code(403).send({
        isSuccessful: false,
        message: "ACCESS_DENIED",
        data: "ACCESS_DENIED",
      } as IResultOperation);
    }
  } catch (error: any) {
    return reply.code(403).send({
      isSuccessful: false,
      message: "ACCESS_DENIED",
      data: "ACCESS_DENIED",
    } as IResultOperation);
  }
  done();
}
