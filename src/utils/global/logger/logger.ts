import axios from "axios";
export async function logger(
	routeName: string,
	statusCode: number,
	message: string,
	priorityId: number,
	colorCode?: number
) {
	try {
		const SendRequest = {
			lan: "nodejs",
			SiteName: "node-base-project",
			RouteName: routeName,
			StatusCode: `${statusCode}`,
			Message: message,
			PriorityId: priorityId,
			ColorCode: colorCode || "1132",
		};
		console.log("[LOGGER] : " + "  ", SendRequest);
		const { data, status } = await axios.post(
			"https://isdynamicDev.com/loggerapi/sendLog",
			SendRequest
		);
	} catch (error) {
		console.log(error);
	}
}
