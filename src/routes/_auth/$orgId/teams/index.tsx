import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/layout";

export const Route = createFileRoute("/_auth/$orgId/teams/")({
	component: TeamsRoute,
});

function TeamsRoute() {
	return (
		<DashboardLayout
			title="Teams"
			actions={
				<Button>
					<PlusIcon />
					Add team
				</Button>
			}
		></DashboardLayout>
	);
}
