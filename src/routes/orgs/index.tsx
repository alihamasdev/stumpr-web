import { useQuery } from "@rocicorp/zero/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2Icon, PlusIcon } from "lucide-react";

import { queries } from "@/lib/zero/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";

export const Route = createFileRoute("/orgs/")({
	component: OrganizationsPage,
});

function OrganizationsPage() {
	const navigate = Route.useNavigate();
	const { user } = Route.useRouteContext();

	const [organizations] = useQuery(queries.joinedOrgsByUser({ userId: user.id }));

	return (
		<main className="container flex flex-col gap-4">
			<div className="flex items-center justify-between gap-4">
				<h1 className="font-heading text-xl/9 font-semibold">Your Organizations</h1>
				<Button onClick={() => navigate({ to: "/orgs/new" })}>
					<PlusIcon />
					New organization
				</Button>
			</div>

			{organizations.length > 0 ? (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{organizations.map((organization) => (
						<Item key={organization.id} variant="outline" render={(props) => <Link to="/$orgId" params={{ orgId: organization.id }} {...props} />}>
							<ItemMedia variant="image">
								<Avatar size="lg">
									<AvatarImage src={`https://avatars.jakerunzer.com/${organization.id}`} alt={organization.name} />
									<AvatarFallback className="text-xs">{organization.name}</AvatarFallback>
								</Avatar>
							</ItemMedia>
							<ItemContent className="gap-0">
								<ItemTitle>{organization.name}</ItemTitle>
								<ItemDescription>{organization.slug}</ItemDescription>
							</ItemContent>
						</Item>
					))}
				</div>
			) : (
				<Empty className="min-h-64 border">
					<EmptyMedia variant="icon">
						<Building2Icon className="size-5" />
					</EmptyMedia>
					<EmptyTitle>No organizations yet</EmptyTitle>
					<EmptyDescription>Create an organization to get your cricket group started.</EmptyDescription>
				</Empty>
			)}
		</main>
	);
}
