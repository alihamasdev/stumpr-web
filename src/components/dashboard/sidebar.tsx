import { useQuery } from "@rocicorp/zero/react";
import { Link, useLocation, useParams, useRouteContext } from "@tanstack/react-router";
import { CheckIcon, ChevronsUpDownIcon, HomeIcon, LayoutDashboardIcon, LayoutGridIcon, PlusIcon, UserIcon, UsersIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { queries } from "@/lib/zero/queries";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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

const pages = [
	{ title: "Home", url: "/home", icon: HomeIcon },
	{ title: "Matches", url: "/matches", icon: LayoutGridIcon },
	{ title: "Teams", url: "/teams", icon: UsersIcon },
	{ title: "Players", url: "/players", icon: UserIcon },
];

export function DashboardSidebar() {
	const { pathname } = useLocation();
	const params = useParams({ from: "/_auth/$orgId" });
	const { session } = useRouteContext({ from: "/_auth/$orgId" });

	const [organizations] = useQuery(queries.joinedOrgsByUser({ userId: session.userId }));

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader className="md:pt-0">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger
								render={({ className, ...props }) => (
									<SidebarMenuButton
										size="lg"
										tooltip="Change Organization"
										className={cn(
											"rounded-lg bg-background text-foreground shadow-xs hover:bg-background",
											"group-data-[state=collapsed]:rounded-md group-data-[state=collapsed]:shadow-sm",
											className,
										)}
										{...props}
									>
										<div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
											<LayoutDashboardIcon className="size-4" />
										</div>
										<div className="flex flex-col gap-0.5 leading-none">
											<span className="text-base font-medium">{organizations.find((org) => org.id === params.orgId)?.name}</span>
										</div>
										<ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
									</SidebarMenuButton>
								)}
							/>
							<DropdownMenuContent align="center" className="min-w-56">
								{organizations.map((organization) => (
									<DropdownMenuItem
										key={organization.id}
										render={(props) => (
											<Link to="/$orgId/home" params={{ orgId: organization.id }} {...props}>
												{organization.name} {organization.id === params.orgId && <CheckIcon className="ml-auto" />}
											</Link>
										)}
									/>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem
									render={(props) => (
										<Link to="/new" {...props}>
											<PlusIcon className="size-4" />
											New Organization
										</Link>
									)}
								/>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{pages.map((page) => {
								const pageUrl = "/" + params.orgId + page.url;
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
