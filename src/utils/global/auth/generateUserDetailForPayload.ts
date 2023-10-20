import { IPayload } from "../../../models/Interfaces/IPayload";
import { IResultOperation } from "../../../models/Interfaces/IResultOperations";
import Auth from "../../../models/databaseModels/auth";
import UserDetail from "../../../models/databaseModels/userDetail";
import { logger } from "../logger/logger";

export const generateUserDetailForPayload = async (userId: string) => {
  try {
    const user = await UserDetail.findOne({ _id: userId }, [
      "firstName",
      "lastName",
      "fullName",
      "passNo",
      "nationalCode",
      "contactOption.mobile",
      "contactOption.email",
      "userActivityStatus.isUserActive",
    ]).limit(1);
    const userAuth = await Auth.findOne({ _id: userId }).limit(1);
    if (userAuth && user) {
      if (!user.userActivityStatus.isUserActive || !userAuth.isUserActive) {
        return {
          isSuccessful: false,
          message: "ACCESS_DENIED",
          data: "USER_INACTIVE",
        } as IResultOperation;
      }
      const payload: IPayload = {
        userId: userAuth.userId,
        email: user.contactOption.email,
        mobile: user.contactOption.mobile,
        roles: userAuth.userRoles,
        firstName: user.firstName,
        lastName: user.lastName,
        nationalCode: user.nationalCode,
        isUserActive: user.userActivityStatus.isUserActive,
      };
      return {
        isSuccessful: false,
        message: "PAYLOAD_GENERATED",
        data: payload,
      } as IResultOperation;
    } else {
      return {
        isSuccessful: false,
        message: "USER_NOTFOUND",
        data: "USER_NOTFOUND",
      } as IResultOperation;
    }
  } catch (error: any) {
    logger(
      "generateUserDetailForPayload",
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
