import { createContext, use } from "react";

import { type Organization } from "@/lib/types";

type OrgContextProps = {
	isAdmin: boolean;
	org: Organization;
};

const OrgContext = createContext<OrgContextProps | null>(null);

export function OrgProvider({ org, isAdmin, ...props }: React.PropsWithChildren<{ org: Organization; isAdmin: boolean }>) {
	const contextValue: OrgContextProps = { isAdmin, org };

	return <OrgContext.Provider value={contextValue} {...props} />;
}

export function useOrg() {
	const context = use(OrgContext);
	if (!context) {
		throw new Error("useOrg must be used within a OrgProvider.");
	}

	return context;
}
