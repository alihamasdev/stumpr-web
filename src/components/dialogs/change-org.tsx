import type React from "react";
import { Link } from "@tanstack/react-router";
import { CheckIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ChangeOrgProps = React.ComponentProps<typeof DropdownMenuContent> & {
	orgId: string;
	trigger: React.ReactElement<"button">;
};

export function ChangeOrg({ orgId, trigger, align = "start", className, ...props }: ChangeOrgProps) {
	const { joinedOrgs } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={trigger} />
			<DropdownMenuContent align={align} className={cn("min-w-56", className)} {...props}>
				{joinedOrgs.map((organization) => (
					<DropdownMenuItem
						key={organization.id}
						render={(props) => (
							<Link to="/$orgId/home" params={{ orgId: organization.id }} {...props}>
								{organization.name} {organization.id === orgId && <CheckIcon className="ml-auto" />}
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
	);
}
