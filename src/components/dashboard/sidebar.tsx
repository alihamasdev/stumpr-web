import { Link, useLocation } from "@tanstack/react-router";
import { ChevronsUpDownIcon, EllipsisVerticalIcon, HomeIcon, LayoutDashboardIcon, LayoutGridIcon, UserIcon, UsersIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useOrg } from "@/contexts/org-context";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { UserDetails, UserMenu } from "@/components/auth/user-menu";
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
	const { state, setOpenMobile } = useSidebar();

	return (
		<Sidebar variant="floating" collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<ChangeOrg
							orgId={org.id}
							align={state === "collapsed" ? "start" : "center"}
							trigger={
								<SidebarMenuButton size="lg">
									<div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
										<LayoutDashboardIcon className="size-4" />
									</div>
									<div className="flex flex-col gap-0.5 leading-none">
										<span className="text-base font-semibold">{org.name}</span>
									</div>
									<ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
								</SidebarMenuButton>
							}
						/>
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
											onClick={() => setOpenMobile(false)}
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
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<UserMenu
							align={state === "collapsed" ? "start" : "center"}
							onLogoutClick={() => setOpenMobile(false)}
							trigger={
								<SidebarMenuButton size="lg">
									<UserDetails />
									<EllipsisVerticalIcon />
								</SidebarMenuButton>
							}
						/>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
