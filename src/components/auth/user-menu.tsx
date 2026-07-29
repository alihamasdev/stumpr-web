import { LogOutIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
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

export function UserMenu({ onLogoutClick, className, children, ...props }: React.ComponentProps<typeof DropdownMenuContent> & { onLogoutClick?: () => void }) {
	const { toogleLogout } = useAuth();
	return (
		<DropdownMenu>
			{children ?? (
				<DropdownMenuTrigger>
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
				<DropdownMenuItem
					variant="destructive"
					onClick={() => {
						onLogoutClick?.();
						toogleLogout();
					}}
				>
					<LogOutIcon />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function UserDetails({ avatarOnly }: { avatarOnly?: boolean }) {
	const { user } = useAuth();

	return (
		<>
			<Avatar>
				{user.image && <AvatarImage src={user.image} alt={user.name} />}
				<AvatarFallback>{user.name}</AvatarFallback>
			</Avatar>
			{!avatarOnly && (
				<div className="grid flex-1 text-left text-sm leading-tight">
					<span className="truncate font-medium text-foreground">{user.name}</span>
					<span className="truncate text-xs">{user.email}</span>
				</div>
			)}
		</>
	);
}
