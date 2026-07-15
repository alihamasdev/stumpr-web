import { useTransition } from "react";
import { Button, toast } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";

import { authClient } from "@/lib/auth/client";

export function GoogleLogin({ ...props }: React.ComponentProps<typeof Button>) {
	const navigate = useNavigate();
	const [isPending, startTransition] = useTransition();
	const { data: session, isPending: isSessionPending } = authClient.useSession();

	return (
		<Button
			isPending={isPending || isSessionPending}
			onClick={() =>
				startTransition(async () => {
					if (session) {
						return navigate({ to: "/orgs" });
					}

					await authClient.signIn.social({
						provider: "google",
						callbackURL: "/orgs",
						fetchOptions: {
							onError: (err) => {
								toast.warning("Google sign-in didn't start", {
									description: "Your account is unchanged. Please try again.",
								});
							},
						},
					});
				})
			}
			{...props}
		>
			Login
		</Button>
	);
}
