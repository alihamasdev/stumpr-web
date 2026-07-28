import { useState } from "react";
import { LogOutIcon } from "lucide-react";

import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutDialog } from "@/components/auth/logout-dialog";

export function UserMenu({ className, children, ...props }: React.ComponentProps<typeof DropdownMenuContent>) {
	const [logoutOpen, setLogoutOpen] = useState(false);

	return (
		<>
			<DropdownMenu>
				{children ?? (
					<DropdownMenuTrigger className="hidden md:block">
						<UserDetails avatarOnly />
					</DropdownMenuTrigger>
				)}
				<DropdownMenuContent align="end" className={cn("w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg", className)} {...props}>
					<DropdownMenuGroup>
						<DropdownMenuLabel className="flex items-center gap-2 text-left text-sm font-normal">
							<UserDetails />
						</DropdownMenuLabel>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive" onClick={() => setLogoutOpen(true)}>
						<LogOutIcon />
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />
		</>
	);
}

export function UserDetails({ avatarOnly }: { avatarOnly?: boolean }) {
	const { data } = authClient.useSession();

	if (!data) return null;

	return (
		<>
			<Avatar>
				{data.user.image && <AvatarImage src={data.user.image} alt={data.user.name} />}
				<AvatarFallback>{data.user.name}</AvatarFallback>
			</Avatar>
			{!avatarOnly && (
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-medium text-foreground">{data.user.name}</span>
					<span className="truncate text-xs">{data.user.email}</span>
				</div>
			)}
		</>
	);
}
