import { redirect } from "@tanstack/react-router";
import { createMiddleware, createServerFn } from "@tanstack/react-start";

import { auth } from "@/lib/auth";

export const validateAuthMiddleware = createMiddleware().server(async ({ next, request }) => {
	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		throw redirect({ to: "/" });
	}

	return next({ context: session });
});

export const validateAuthUser = createServerFn({ method: "GET" })
	.middleware([validateAuthMiddleware])
	.handler(async ({ context }) => context);
