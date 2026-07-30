import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/layout";

export const Route = createFileRoute("/_auth/$orgId/players/")({
	component: PlayersRoute,
});

function PlayersRoute() {
	return (
		<DashboardLayout
			title="Players"
			actions={
				<Button>
					<PlusIcon />
					Add player
				</Button>
			}
		></DashboardLayout>
	);
}
