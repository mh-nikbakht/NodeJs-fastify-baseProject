import { FastifyReply, FastifyRequest } from "fastify";
import * as client from "prom-client";

const gauge = new client.Gauge({
	name: "internal_errors",
	help: "internal errors gauge on each micros",
});
export default (request: any, reply: any, done: any) => {
	if (reply.statusCode.toString() === "500") {
		gauge.inc();
		console.log(reply.statusCode);
	}
	done();
};
