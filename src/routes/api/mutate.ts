import { mustGetMutator } from "@rocicorp/zero";
import { handleMutateRequest } from "@rocicorp/zero/server";
import { createFileRoute } from "@tanstack/react-router";

import { dbProvider } from "@/lib/zero/db-provider";
import { mutators } from "@/lib/zero/mutators";

export const Route = createFileRoute("/api/mutate")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const result = await handleMutateRequest({
					dbProvider,
					handler: (transact) =>
						transact((tx, name, args) => {
							const mutator = mustGetMutator(mutators, name);
							return mutator.fn({ args, tx });
						}),
					request,
					userID: null,
				});

				return Response.json(result);
			},
		},
	},
});
