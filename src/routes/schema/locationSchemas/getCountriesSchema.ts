import { FastifyReply, FastifyRequest } from "fastify";
import { getCountriesController } from "../../../controller/locationControllers/getCountriesController";

async function ControllerOnGetCountries(
	request: FastifyRequest,
	response: FastifyReply,
	done: (err?: Error) => {}
) {
	await getCountriesController(request, response, done);
}
const preHandlerOnGetOnGetCountries = {
	preHandler: async (request: FastifyRequest, response: FastifyReply) => {},
};
export { ControllerOnGetCountries, preHandlerOnGetOnGetCountries };
