import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/$orgId/")({
	beforeLoad: ({ params }) => {
		throw redirect({ to: "/$orgId/home", params: { orgId: params.orgId } });
	},
});
