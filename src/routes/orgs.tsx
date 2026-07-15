import { useState, useTransition } from "react";
import { Avatar, Button, Card, Chip, FieldError, Form, Input, Label, TextField, toast, useOverlayState } from "@heroui/react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { Building2Icon, PlusIcon, UsersIcon } from "lucide-react";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { validateAuthMiddleware, validateAuthUser } from "@/lib/auth/validations";
import { prisma } from "@/lib/db";
import { Modal } from "@/components/ui/modal";

const getJoinedOrganizations = createServerFn({ method: "GET" })
	.middleware([validateAuthMiddleware])
	.handler(async ({ context }) => {
		return prisma.organization.findMany({
			where: { members: { some: { userId: context.session.userId } } },
			orderBy: { name: "asc" },
			select: {
				id: true,
				name: true,
				logo: true,
				_count: { select: { members: true } },
			},
		});
	});

const createOrganization = createServerFn({ method: "POST" })
	.middleware([validateAuthMiddleware])
	.validator(z.object({ name: z.string().trim().min(3, "Name should be atleat 3 characters") }))
	.handler(async ({ data, context }) => {
		const organization = await auth.api.createOrganization({
			body: { name: data.name, slug: Date.now().toString(), userId: context.session.userId },
		});

		return { id: organization.id };
	});

export const Route = createFileRoute("/orgs")({
	beforeLoad: async () => await validateAuthUser(),
	loader: () => getJoinedOrganizations(),
	component: OrganizationsPage,
});

function OrganizationsPage() {
	const organizations = Route.useLoaderData();

	return (
		<div className="container min-h-dvh space-y-8 py-10">
			<header className="flex items-center justify-between gap-4">
				<h1 className="text-2xl font-bold">Organizations</h1>
				<CreateOrganizationButton />
			</header>

			<main className="">
				{organizations.length > 0 ? (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{organizations.map((organization) => (
							<Card key={organization.id}>
								<Card.Header className="flex-row items-start justify-between gap-4">
									<Avatar size="lg">
										{organization.logo ? <Avatar.Image src={organization.logo} alt="" /> : null}
										<Avatar.Fallback>{organization.name.slice(0, 2).toUpperCase()}</Avatar.Fallback>
									</Avatar>
								</Card.Header>
								<Card.Content className="flex flex-col gap-1">
									<Card.Title>{organization.name}</Card.Title>
								</Card.Content>
								<Card.Footer className="text-muted-foreground flex items-center gap-2 text-sm">
									<UsersIcon className="size-4" aria-hidden="true" />
									{organization._count.members} {organization._count.members === 1 ? "member" : "members"}
								</Card.Footer>
							</Card>
						))}
					</div>
				) : (
					<Card className="border-dashed">
						<Card.Content className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
							<div className="flex size-12 items-center justify-center rounded-full bg-default">
								<Building2Icon className="size-5" aria-hidden="true" />
							</div>
							<div className="space-y-1">
								<Card.Title>No organizations yet</Card.Title>
								<Card.Description>Create an organization to get your cricket group started.</Card.Description>
							</div>
						</Card.Content>
					</Card>
				)}
			</main>
		</div>
	);
}

function CreateOrganizationButton() {
	const router = useRouter();
	const modal = useOverlayState();

	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const [isPending, startTransition] = useTransition();

	const createOrganizationFn = useServerFn(createOrganization);

	function resetForm() {
		setName("");
		setError("");
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");

		startTransition(async () => {
			try {
				await createOrganizationFn({ data: { name } });
				await router.invalidate();
				modal.close();
				resetForm();
				toast.success("Organization created");
			} catch (err) {
				setError(err instanceof Error ? err.message : "The organization could not be created.");
			}
		});
	}

	return (
		<>
			<Button variant="primary" onPress={modal.open}>
				<PlusIcon className="size-4" aria-hidden="true" />
				Create organization
			</Button>

			<Modal
				state={modal}
				title="Create organization"
				footer={[
					{ type: "button", children: "Cancel", variant: "ghost", onPress: modal.close, isDisabled: isPending },
					{ type: "submit", children: "Create", form: "create-organization-form", onPress: modal.close, isPending: isPending, isDisabled: !name.trim() },
				]}
			>
				<Form id="create-organization-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
					<TextField value={name} onChange={setName} isRequired>
						<Label>Name</Label>
						<Input placeholder="Ghurki Cricket" autoFocus />
						<FieldError />
					</TextField>
					{error ? <p className="text-sm text-danger">{error}</p> : null}
				</Form>
			</Modal>
		</>
	);
}
