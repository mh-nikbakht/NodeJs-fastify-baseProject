import {
	FastifyInstance,
	FastifyError,
	FastifyRequest,
	FastifyReply,
} from "fastify";
import { customInternalHandler } from "./errorHandeling";

export const errorHandler = (app: FastifyInstance) => {
	app.setErrorHandler(
		(error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
			customInternalHandler(error, request, reply);
		}
	);
};
