import { IResultOperation } from "../../../models/Interfaces/IResultOperations";
import { isRestrictToken } from "./isRestrictToken";
import { isUserValidToProcess } from "./isUserValidToProcess";

export const preparingAuthMiddleware = async (
  userId: string,
  token: string,
  path: string,
): Promise<{
  IsRestrictToken: IResultOperation;
  validHosts: string[];
  isUserValidToProcessRes: IResultOperation;
}> => {
  const IsRestrictToken = await isRestrictToken(token, userId);
  const validHosts = ["localhost", "localhost:3206", "[::]:3206"];
  const isUserValidToProcessRes = await isUserValidToProcess(userId, path);
  return {
    IsRestrictToken,
    validHosts,
    isUserValidToProcessRes,
  };
};
