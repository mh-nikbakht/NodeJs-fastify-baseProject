import { FastifyInstance } from "fastify";
import { locationRoute } from "./schema/locationSchemas";
export default async function (app: FastifyInstance) {
	app.register(locationRoute);
}
