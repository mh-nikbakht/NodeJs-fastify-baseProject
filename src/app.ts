import fastify from "fastify";
import path from "path";
import { config, register } from "./configs";

const isDev = true;
if (isDev) config({ path: path.resolve(process.cwd(), "dev.env") });
else config({ path: path.resolve(process.cwd(), "prod.env") });
const server = fastify();

register(server);
server.listen(
	{ port: +process.env.PORT!, host: process.env.HOST! },
	(err: any, address: any) => {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log(`[SERVER] Server listening at ${address}`);
	}
);
