import { useNavigate } from "@tanstack/react-router";

import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function LogoutDialog({ ...props }: React.ComponentProps<typeof Dialog>) {
	const naviagte = useNavigate();

	const handleLogout = async () => {
		await authClient.signOut();
		naviagte({ to: "/" });
	};

	return (
		<Dialog {...props}>
			<DialogContent className="max-w-sm">
				<DialogHeader>
					<DialogTitle>Confirm logout?</DialogTitle>
					<DialogDescription>Are you sure you want to logout from your account?</DialogDescription>
				</DialogHeader>
				<DialogFooter className="grid md:grid-cols-2">
					<DialogClose
						render={(props) => (
							<Button variant="outline" {...props}>
								Cancel
							</Button>
						)}
					/>
					<Button variant="destructive" onClick={handleLogout}>
						Logout
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
