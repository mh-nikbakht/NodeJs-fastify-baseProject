import { IResultOperation } from "../../../models/Interfaces/IResultOperations";
import RestrictToken from "../../../models/databaseModels/restrictToken";
import { logger } from "../logger/logger";

export const isRestrictToken = async (
  token: string,
  userId?: string,
): Promise<IResultOperation> => {
  try {
    const restrictToken = await RestrictToken.findOne({
      token: token,
      userId: userId,
    }).limit(1);
    if (!restrictToken) {
      return {
        isSuccessful: false,
        message: "ACCESS_DENIED",
        data: "ACCESS_DENIED",
      } as IResultOperation;
    } else if (restrictToken && restrictToken.type === "block") {
      return {
        isSuccessful: false,
        message: "ACCESS_DENIED",
        data: "BLOCK",
      } as IResultOperation;
    } else if (restrictToken && restrictToken.type === "refresh") {
      return {
        isSuccessful: false,
        message: "ACCESS_DENIED",
        data: "REFRESH",
      } as IResultOperation;
    } else {
      return {
        isSuccessful: true,
        message: "ACCESS_GRANT",
        data: "ACCESS_GRANT",
      } as IResultOperation;
    }
  } catch (error: any) {
    logger(
      "isRestrictToken",
      500,
      `An error occurred. Error is: ${error.message}`,
      8,
    );
    return {
      isSuccessful: false,
      message: "ACCESS_GRANT",
      data: "ACCESS_GRANT",
    } as IResultOperation;
  }
};
