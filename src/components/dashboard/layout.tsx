import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type DashboardLayoutProps = React.ComponentProps<"div"> & {
	title: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
	showSidebarTrigger?: boolean;
};

export function DashboardLayout({ title, showSidebarTrigger = true, actions, className, children }: DashboardLayoutProps) {
	return (
		<>
			<header className={cn("sticky top-0 z-1 flex items-center justify-between gap-3 py-2", className)}>
				<div className="flex items-center gap-3">
					{showSidebarTrigger && <SidebarTrigger />}
					{showSidebarTrigger && <Separator orientation="vertical" className="my-1 mr-1.5 h-6" />}
					<h1 className="text-base/8 font-semibold">{title}</h1>
				</div>
				<div className="flex items-center gap-3">{actions}</div>
			</header>
			{children}
		</>
	);
}
