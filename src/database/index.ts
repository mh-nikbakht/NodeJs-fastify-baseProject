import { FastifyPluginAsync } from "fastify";
import mongoose from "mongoose";
import { sleep } from "../utils/time";

const databasePlugin: FastifyPluginAsync = async (fastify, opts) => {
	const uri = process.env.MONGO_URI!;

	for (let i = 0; i < 3; i++) {
		try {
			console.log(`[DATABASE] connecting to ${uri}`);
			await mongoose.connect(uri, {
				appName: process.env.npm_package_name?.toString(),
			});
			return;
		} catch {
			console.log("[DATABASE] could not connect to database");
			await sleep(1);
		}
	}
	console.log("[SERVER] fail to start database");
	process.exit(1);
};

export default databasePlugin;
