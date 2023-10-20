import { IResultOperation } from "../../../models/Interfaces/IResultOperations";
import Auth from "../../../models/databaseModels/auth";
import { logger } from "../logger/logger";

export const isUserValidToProcess = async (userId: string, url: string) => {
  try {
    const auth = await Auth.findOne({ userId: userId }).limit(1);
    if (!auth) {
      return {
        isSuccessful: false,
        message: "ACCESS_DENIED",
        data: 403,
      } as IResultOperation;
    }

    const isUrlAllowedForUser: boolean = auth.userRoles.some((user) => {
      return user.permissions.some((permission) => {
        return permission.allowedUrls.includes(url);
      });
    });
    console.log("isUrlAllowedForUser", isUrlAllowedForUser);
    if (isUrlAllowedForUser) {
      return {
        isSuccessful: true,
        message: "ACCESS_GRANTED",
        data: 200,
      } as IResultOperation;
    } else {
      return {
        isSuccessful: false,
        message: "ACCESS_DENIED",
        data: 403,
      } as IResultOperation;
    }
  } catch (error: any) {
    logger(
      "isUserValidToProcess",
      500,
      `An error occurred. Error is: ${error.message}`,
      8,
    );
    return {
      isSuccessful: false,
      message: "Internal error occurred",
      data: "Check logs for more information",
    } as IResultOperation;
  }
};
