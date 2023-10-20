//#region import
import { ControllerOnGetCountries } from "./getCountriesSchema";
//#endregion

function locationRoutes(fastify: any, options: any, done: any) {
	fastify.get("/countries", {}, ControllerOnGetCountries);
	done();
}
export { locationRoutes as locationRoute };
