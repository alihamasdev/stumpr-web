import { defineMutator, defineMutators } from "@rocicorp/zero";
import { z } from "zod";

export const mutators = defineMutators({
	activateUser: defineMutator(z.object({ id: z.string() }), async ({ args: { id }, tx }) => {
		await tx.mutate.User.update({ id });
	}),
});
