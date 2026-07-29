import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function LogoutDialog({ logoutUser, ...props }: React.ComponentProps<typeof Dialog> & { logoutUser: () => Promise<void> }) {
	return (
		<Dialog {...props}>
			<DialogContent className="max-w-2xs">
				<DialogHeader>
					<DialogTitle>Confirm logout?</DialogTitle>
					<DialogDescription>Are you sure you want to logout from your account?</DialogDescription>
				</DialogHeader>
				<DialogFooter className="grid grid-cols-2">
					<DialogClose
						render={(props) => (
							<Button variant="outline" {...props}>
								Cancel
							</Button>
						)}
					/>
					<Button variant="destructive" onClick={logoutUser}>
						Logout
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
