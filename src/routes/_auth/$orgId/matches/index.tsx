import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/layout";

export const Route = createFileRoute("/_auth/$orgId/matches/")({
	component: MatchesRoute,
});

function MatchesRoute() {
	return (
		<DashboardLayout
			title="Matches"
			actions={
				<Button>
					<PlusIcon />
					New match
				</Button>
			}
		></DashboardLayout>
	);
}
