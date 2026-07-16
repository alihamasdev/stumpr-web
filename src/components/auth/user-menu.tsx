import { useState } from "react";
import { LogOutIcon } from "lucide-react";

import { authClient } from "@/lib/auth/client";
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

export function UserMenu() {
	const { data } = authClient.useSession();

	const [logoutOpen, setLogoutOpen] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar>
						{data?.user.image && <AvatarImage src={data.user.image} />}
						<AvatarFallback>{data?.user.name}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg">
					<DropdownMenuGroup>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar>
									{data?.user.image && <AvatarImage src={data.user.image} alt={data?.user.name} />}
									<AvatarFallback>{data?.user.name}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{data?.user.name}</span>
									<span className="truncate text-xs">{data?.user.email}</span>
								</div>
							</div>
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
