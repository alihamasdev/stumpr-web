import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "@/contexts/auth-context";
import { DashboardLayout } from "@/components/dashboard/layout";

export const Route = createFileRoute("/_auth/$orgId/home/")({
	component: HomeRoute,
});

function HomeRoute() {
	const { user } = useAuth();
	return <DashboardLayout title={`Welcome Back, ${user.name}`}></DashboardLayout>;
}
