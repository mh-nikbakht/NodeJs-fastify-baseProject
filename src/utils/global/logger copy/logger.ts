import axios from "axios";
export async function logger(
  routeName: string,
  statusCode: number,
  message: string,
  priorityId: number,
  colorCode?: number,
) {
  try {
    const SendRequest = {
      lan: "nodejs",
      SiteName: "user-profile",
      RouteName: routeName,
      StatusCode: `${statusCode}`,
      Message: message,
      PriorityId: priorityId,
      ColorCode: colorCode || "1132",
    };
    console.log("[LOGGER] : " + "  ", SendRequest);
    await axios.post("https://isdynamicDev.com/loggerapi/sendLog", SendRequest);
  } catch (error) {
    console.log(error);
  }
}
