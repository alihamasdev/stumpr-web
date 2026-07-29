import { Link } from "@tanstack/react-router";
import { CheckIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ChangeOrgProps = {
	orgId: string;
	className?: string;
	align?: "start" | "center" | "end";
	children: React.ReactElement<"button">;
};

export function ChangeOrg({ orgId, align = "start", className, children }: ChangeOrgProps) {
	const { joinedOrgs } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={children} />
			<DropdownMenuContent align={align} className={cn("min-w-56", className)}>
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
