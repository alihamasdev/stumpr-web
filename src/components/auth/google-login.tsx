import { useTransition } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "cnfast";
import { toast } from "sonner";

import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export function GoogleLogin({ className, ...props }: React.ComponentProps<typeof Button>) {
	const navigate = useNavigate();
	const [isPending, startTransition] = useTransition();
	const { data: session, isPending: isSessionPending } = authClient.useSession();

	return (
		<Button
			className={cn("rounded-full", className)}
			disabled={isPending || isSessionPending}
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
								console.error("Google auth error: ", err);
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
