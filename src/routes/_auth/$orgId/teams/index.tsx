import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/$orgId/teams/")({
	component: TeamsRoute,
});

function TeamsRoute() {
	return <div>Hello "/_auth/$orgId/teams"!</div>;
}
