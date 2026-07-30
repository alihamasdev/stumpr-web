import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute, Link, notFound, Outlet, useParams } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";

import { queries } from "@/lib/zero/queries";
import { useAuth } from "@/contexts/auth-context";
import { OrgProvider } from "@/contexts/org-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { OrgDropdown } from "@/components/dashboard/org-dropdown";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export const Route = createFileRoute("/_auth/$orgId")({
	ssr: false,
	component: () => {
		const { joinedOrgs, user } = useAuth();
		const { orgId } = useParams({ from: "/_auth/$orgId" });

		const [orgMember] = useQuery(queries.getOrgMember({ orgId, userId: user.id }));

		const currentOrg = joinedOrgs.find((org) => org.id === orgId);
		if (!currentOrg || !orgMember) {
			throw notFound();
		}

		return (
			<OrgProvider org={currentOrg} isAdmin={orgMember.role === "owner"}>
				<SidebarProvider>
					<DashboardSidebar />
					<SidebarInset className="container">
						<Outlet />
					</SidebarInset>
				</SidebarProvider>
			</OrgProvider>
		);
	},
	notFoundComponent: ({ routeId }) => {
		const { orgId } = useParams({ from: "/_auth/$orgId" });

		const isOrgNotFound = routeId === "/_auth/$orgId";
		const isMatchNotFound = routeId === "/_auth/$orgId/matches/";
		const isPlayerNotFound = routeId === "/_auth/$orgId/players/";

		return (
			<Empty className="gap-6">
				<EmptyTitle className="text-6xl font-bold text-primary md:text-9xl">404</EmptyTitle>
				<EmptyDescription className="md:text-lg">
					Sorry, we couldn't find the {isOrgNotFound ? "organization" : isMatchNotFound ? "match" : isPlayerNotFound ? "player" : "page"} you're looking for.
				</EmptyDescription>
				<div className="flex items-center justify-center gap-4">
					{isOrgNotFound ? (
						<OrgDropdown
							orgId={orgId}
							align="center"
							trigger={
								<Button size="lg" variant="outline">
									Select Organization
								</Button>
							}
						/>
					) : (
						<Link
							params={{ orgId }}
							className={buttonVariants({ size: "lg", variant: "outline", className: "border-border!" })}
							to={isMatchNotFound ? "/$orgId/matches" : isPlayerNotFound ? "/$orgId/players" : "/$orgId/home"}
						>
							<ChevronLeftIcon />
							Back To {isMatchNotFound ? "Matches" : isPlayerNotFound ? "Players" : "Home"}
						</Link>
					)}
				</div>
			</Empty>
		);
	},
});
