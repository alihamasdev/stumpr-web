import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";

import { validateAuthUser } from "@/lib/auth/validations";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { UserMenu } from "@/components/auth/user-menu";

export const Route = createFileRoute("/orgs")({
	beforeLoad: () => validateAuthUser(),
	component: OrgLayout,
});

function OrgLayout() {
	return (
		<div className="flex min-h-dvh w-full flex-col gap-8 md:gap-16">
			<header className="border-b">
				<div className="container flex items-center justify-between px-4 py-3">
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>
									<HomeIcon className="size-4" />
								</BreadcrumbPage>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Organizations</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>

					<UserMenu />
				</div>
			</header>
			<Outlet />
		</div>
	);
}
