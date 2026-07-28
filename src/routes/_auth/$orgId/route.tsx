import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export const Route = createFileRoute("/_auth/$orgId")({
	component: OrganizationLayout,
});

function OrganizationLayout() {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset>
				<DashboardHeader />
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
