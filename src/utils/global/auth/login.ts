import { IResultOperation } from "../../../models/Interfaces/IResultOperations";
import Auth from "../../../models/databaseModels/auth";
import { TimeHelper } from "../../time";
import { logger } from "../logger/logger";
import { generateUserDetailForPayload } from "./generateUserDetailForPayload";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");

export const login = async (userId: string) => {
  try {
    const userAuth = await Auth.findOne({ userId });
    const timeHelper = new TimeHelper();
    if (userAuth && userAuth.isUserActive) {
      const token = await jwt.sign(
        await generateUserDetailForPayload(userId),
        process.env.SECRET_TOKEN,
        { expiresIn: "3 days" },
      );
      userAuth.userToken = token;
      userAuth.createdAt = new Date(timeHelper.Now());
      const expire = new Date(timeHelper.Now());
      expire.setDate(expire.getDate() + 3);
      userAuth.createdAt = expire;

      userAuth.loginDetail.push({
        fromAgent: "",
        fromCountry: "",
        fromIp: "",
        fromIsp: "",
        date: new Date(timeHelper.Now()),
      });
      await userAuth.save();
      return {
        isSuccessful: true,
        message: "token generated successfully !",
        data: token,
      } as IResultOperation;
    } else {
      return {
        isSuccessful: false,
        message: "ACCESS_DENIED",
        data: "USER_NOT_FOUND",
      } as IResultOperation;
    }
  } catch (error: any) {
    logger("login", 500, `An error occurred. Error is: ${error.message}`, 8);
    return {
      isSuccessful: false,
      message: "Internal error occurred",
      data: "Check logs for more information",
    } as IResultOperation;
  }
};
