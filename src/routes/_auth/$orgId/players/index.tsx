import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/$orgId/players/")({
	component: PlayersRoute,
});

function PlayersRoute() {
	return <div>Hello "/_auth/$orgId/players"!</div>;
}
