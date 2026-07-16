import { defineQueries, defineQuery } from "@rocicorp/zero";
import { z } from "zod";

import { zql } from "@/lib/zero/schema";

export const queries = defineQueries({
	joinedOrgsByUser: defineQuery(z.object({ userId: z.string() }), ({ args: { userId } }) => {
		return zql.Organization.whereExists("members", (member) => member.where("userId", userId)).orderBy("name", "asc");
	}),
});
