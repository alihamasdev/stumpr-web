import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/$orgId/home/")({
	component: HomeRoute,
});

function HomeRoute() {
	return <div>Hello "/_auth/$orgId/home"!</div>;
}
