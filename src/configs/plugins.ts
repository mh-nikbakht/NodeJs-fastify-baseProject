import { FastifyInstance } from "fastify";
import databasePlugin from "../database";
import { errorHandler } from "../middleware";
import routes from "../routes";
import { listenToQueue } from "../utils/global/QueueManager";
const metricsPlugin = require("fastify-metrics");
// registers plugins
export const register = (server: FastifyInstance) => {
	server.register(metricsPlugin, { endpoint: "/metrics" });
	server.register(databasePlugin);
	server.register(routes);
	listenToQueue()
		.then(() => {
			console.log("[QUEUE] Connected !");
		})
		.catch((err: any) => {
			console.log("[QUEUE] Cant Connect !", err.message);
		});
	errorHandler(server);
	return server;
};
