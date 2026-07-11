import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { prisma } from "@/lib/db";

export function createAuth() {
	if (!process.env.BETTER_AUTH_SECRET || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
		throw new Error("env variables are not set");
	}

	return betterAuth({
		secret: process.env.BETTER_AUTH_SECRET,
		plugins: [organization(), tanstackStartCookies()],
		database: prismaAdapter(prisma, { provider: "postgresql" }),
		socialProviders: {
			google: {
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			},
		},
	});
}

export const auth = createAuth();
