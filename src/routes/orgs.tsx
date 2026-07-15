import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/orgs")({
	component: OrgsRoute,
});

function OrgsRoute() {
	return <div>Hello "/orgs"!</div>;
}
