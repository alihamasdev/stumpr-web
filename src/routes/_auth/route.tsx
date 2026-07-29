import { createFileRoute, Outlet } from "@tanstack/react-router";

import { validateAuthUser } from "@/lib/auth/validations";
import { AuthProvider } from "@/contexts/auth-context";

export const Route = createFileRoute("/_auth")({
	beforeLoad: () => validateAuthUser(),
	component: () => {
		const { user } = Route.useRouteContext();

		return (
			<AuthProvider initUser={user}>
				<Outlet />
			</AuthProvider>
		);
	},
});
