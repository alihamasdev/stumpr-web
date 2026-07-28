import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/$orgId/matches/")({
	component: MatchesRoute,
});

function MatchesRoute() {
	return <div>Hello "/_auth/$orgId/matches"!</div>;
}
