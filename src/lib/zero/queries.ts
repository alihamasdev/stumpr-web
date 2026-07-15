import { defineQueries, defineQuery } from "@rocicorp/zero";

import { zql } from "@/lib/zero/schema";

export const queries = defineQueries({
	allUsers: defineQuery(() => zql.User),
});
