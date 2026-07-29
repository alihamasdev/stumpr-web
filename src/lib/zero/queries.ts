import { defineQueries, defineQuery } from "@rocicorp/zero";
import { z } from "zod";

import { zql } from "@/lib/zero/schema";

const userIdSchema = z.object({ userId: z.string().nonempty() });
const orgIdSchema = z.object({ orgId: z.string().nonempty() });

const userOrgSchema = userIdSchema.extend(orgIdSchema.shape);

export const queries = defineQueries({
	joinedOrgsByUser: defineQuery(userIdSchema, ({ args }) => {
		return zql.Organization.whereExists("members", (member) => member.where("userId", args.userId)).orderBy("name", "asc");
	}),
	getOrgMember: defineQuery(userOrgSchema, ({ args }) => {
		return zql.Member.where("organizationId", args.orgId).where("userId", args.userId).one();
	}),
});
