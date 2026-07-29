import { Link, useLocation } from "@tanstack/react-router";
import { ChevronsUpDownIcon, HomeIcon, LayoutDashboardIcon, LayoutGridIcon, UserIcon, UsersIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useOrg } from "@/contexts/org-context";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChangeOrg } from "@/components/dialogs/change-org";

const pages = [
	{ title: "Home", url: "/home", icon: HomeIcon },
	{ title: "Matches", url: "/matches", icon: LayoutGridIcon },
	{ title: "Teams", url: "/teams", icon: UsersIcon },
	{ title: "Players", url: "/players", icon: UserIcon },
];

export function DashboardSidebar() {
	const { org } = useOrg();
	const { pathname } = useLocation();

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader className="md:pt-0">
				<SidebarMenu>
					<SidebarMenuItem>
						<ChangeOrg orgId={org.id} align="start">
							<SidebarMenuButton
								size="lg"
								className={cn(
									"rounded-lg bg-background text-foreground shadow-xs hover:bg-background",
									"group-data-[state=collapsed]:rounded-md group-data-[state=collapsed]:shadow-sm",
								)}
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
									<LayoutDashboardIcon className="size-4" />
								</div>
								<div className="flex flex-col gap-0.5 leading-none">
									<span className="text-base font-medium">{org.name}</span>
								</div>
								<ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
							</SidebarMenuButton>
						</ChangeOrg>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{pages.map((page) => {
								const pageUrl = "/" + org.id + page.url;
								return (
									<SidebarMenuItem key={page.url}>
										<SidebarMenuButton
											tooltip={page.title}
											isActive={pathname === pageUrl}
											render={(props) => (
												<Link to={pageUrl} {...props}>
													<page.icon />
													{page.title}
												</Link>
											)}
										/>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
