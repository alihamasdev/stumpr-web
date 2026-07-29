import { createContext, use, useState } from "react";
import { useQuery } from "@rocicorp/zero/react";
import { redirect, useNavigate } from "@tanstack/react-router";

import { authClient } from "@/lib/auth/client";
import { type Organization, type User } from "@/lib/types";
import { queries } from "@/lib/zero/queries";
import { LogoutDialog } from "@/components/auth/logout-dialog";

type AuthContextProps = {
	user: User;
	joinedOrgs: Organization[];
	toogleLogout: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ initUser, children }: React.PropsWithChildren<{ initUser: User }>) {
	const naviagte = useNavigate();

	const [user, setUser] = useState<User | null>(initUser);
	const [logoutOpen, setLogoutOpen] = useState(false);

	const [joinedOrgs] = useQuery(queries.joinedOrgsByUser({ userId: initUser.id }));

	const toogleLogout = () => {
		setLogoutOpen((open) => !open);
	};

	const logoutUser = async () => {
		await authClient.signOut();
		setUser(null);
		setLogoutOpen(false);
		naviagte({ to: "/" });
	};

	if (!user) {
		return redirect({ to: "/" });
	}

	const contextValue = { user, joinedOrgs, toogleLogout };

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
			<LogoutDialog open={logoutOpen} onOpenChange={setLogoutOpen} logoutUser={logoutUser} />
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = use(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within a AuthProvider.");
	}

	return context;
}
