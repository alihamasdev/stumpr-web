import { createFileRoute, Outlet } from "@tanstack/react-router";

import { validateAuthUser } from "@/lib/auth/validations";

export const Route = createFileRoute("/_auth")({
	beforeLoad: () => validateAuthUser(),
	component: () => <Outlet />,
});
