import type { ZeroOptions } from "@rocicorp/zero";
import { ZeroProvider } from "@rocicorp/zero/react";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import { mutators } from "@/lib/zero/mutators";
import { schema } from "@/lib/zero/schema";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import appCss from "../styles.css?url";

const zeroOpts: ZeroOptions = {
	cacheURL: "http://localhost:4848",
	schema,
	mutators,
};

export const Route = createRootRoute({
	head: () => ({
		links: [{ rel: "stylesheet", href: appCss }],
		meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "Stumpr" }],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<TooltipProvider>
					<ZeroProvider {...zeroOpts}>{children}</ZeroProvider>
					<Toaster />
				</TooltipProvider>
				<Scripts />
			</body>
		</html>
	);
}
