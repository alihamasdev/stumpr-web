import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/auth/user-menu";

export function DashboardHeader() {
	return (
		<header className="border-b px-2 py-2 md:px-4">
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className="contents xl:hidden">
						<SidebarTrigger />
						<Separator orientation="vertical" className="my-1.5 mr-2 data-[orientation=vertical]:h-5" />
					</div>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Dashboard</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<UserMenu />
			</div>
		</header>
	);
}
