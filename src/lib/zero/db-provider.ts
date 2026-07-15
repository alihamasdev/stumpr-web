import { PrismaPg } from "@prisma/adapter-pg";
import { zeroPrisma } from "@rocicorp/zero/server/adapters/prisma";

import { PrismaClient } from "@/lib/prisma/client";
import { schema } from "@/lib/zero/schema";

const connectionString = process.env.ZERO_UPSTREAM_DB;
if (!connectionString) {
	throw new Error("ZERO_UPSTREAM_DB is not set");
}

const prisma = new PrismaClient({
	adapter: new PrismaPg({
		connectionString,
	}),
});

export const dbProvider = zeroPrisma(schema, prisma);

// Register global types for mutators on the server
declare module "@rocicorp/zero" {
	interface DefaultTypes {
		dbProvider: typeof dbProvider;
	}
}
