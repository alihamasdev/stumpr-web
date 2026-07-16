import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { toast } from "sonner";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { validateAuthMiddleware } from "@/lib/auth/validations";
import { getErrorMessage } from "@/lib/utils";
import { useForm } from "@/hooks/use-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/orgs/new")({
	component: NewOrgRoute,
});

const organizationSchema = z.object({
	name: z.string().trim().min(3, "Name must be atleast 3 characters").max(50, "Name must be 50 characters or fewer."),
});

const createOrganization = createServerFn({ method: "POST" })
	.middleware([validateAuthMiddleware])
	.validator(organizationSchema)
	.handler(async ({ data }) => {
		const organization = await auth.api.createOrganization({
			headers: getRequestHeaders(),
			body: {
				name: data.name,
				slug: Date.now().toString(),
			},
		});

		return { orgId: organization.id };
	});

function NewOrgRoute() {
	const navigate = Route.useNavigate();

	const createOrganizationFn = useServerFn(createOrganization);

	const form = useForm({
		defaultValues: {
			name: "",
		},
		validators: {
			onSubmit: organizationSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const { orgId } = await createOrganizationFn({ data: value });
				navigate({ to: "/$orgId", params: { orgId } });
				form.reset();
				toast.success("Organization created");
			} catch (err) {
				const unexpectedError = getErrorMessage(err, "We couldn't create the organization. Try again.");
				toast.error(unexpectedError);
			}
		},
	});

	return (
		<main className="container flex justify-center">
			<Card className="w-full max-w-sm md:max-w-md">
				<CardHeader className="border-b">
					<CardTitle>Create Organization</CardTitle>
				</CardHeader>

				<CardContent>
					<form.AppForm>
						<Form id={form.formId} onSubmit={form.handleSubmit}>
							<FieldGroup>
								<form.AppField name="name" children={(field) => <field.Input label="Name" placeholder="Ghurki Cricket" autoFocus />} />
							</FieldGroup>
						</Form>
					</form.AppForm>
				</CardContent>

				<CardFooter className="justify-end gap-2">
					<form.Subscribe selector={(state) => state.isSubmitting}>
						{(isSubmitting) => (
							<>
								<Button type="button" variant="outline" onClick={() => navigate({ to: ".." })} disabled={isSubmitting}>
									Cancel
								</Button>
								<Button type="submit" form={form.formId} disabled={isSubmitting}>
									{isSubmitting ? <Spinner /> : null}
									Create
								</Button>
							</>
						)}
					</form.Subscribe>
				</CardFooter>
			</Card>
		</main>
	);
}
