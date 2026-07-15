import { createFileRoute, Link } from "@tanstack/react-router";
import { CloudOffIcon, RotateCcwIcon, UsersIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoogleLogin } from "@/components/google-login";
import { StumprIcon } from "@/components/icons";

export const Route = createFileRoute("/")({
	component: () => {
		return (
			<div className="relative flex min-h-dvh w-full flex-col overflow-x-hidden">
				<header className="fixed top-8 left-1/2 z-10 container w-full -translate-x-1/2 rounded-full border bg-background/50 backdrop-blur-xl">
					<div className="flex items-center justify-between px-4 py-4">
						<Link to="/" className="flex items-center gap-1.5">
							<StumprIcon className="size-6" />
							<span className="text-2xl font-bold">Stumpr</span>
						</Link>

						<nav className="hidden text-sm *:hover:text-accent *:hover:transition-colors *:hover:duration-300 md:flex md:items-center md:gap-6">
							<Link to="/">Home</Link>
							<Link to="/" hash="features">
								Features
							</Link>
							<Link to="/" hash="how-it-works">
								How it works
							</Link>
						</nav>

						<GoogleLogin className="h-10 px-6" />
					</div>
				</header>

				<div className="absolute top-20 -left-40 h-80 w-80 rounded-full bg-accent/40 blur-[120px] sm:-left-60 sm:h-[512px] sm:w-[512px] sm:blur-[160px]" />
				<div className="absolute top-28 -right-40 h-80 w-80 rounded-full bg-accent/30 blur-[120px] sm:-right-60 sm:h-[512px] sm:w-[512px] sm:blur-[160px]" />

				<main className="relative overflow-x-hidden py-16 md:py-20">
					<section className="relative container grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr]">
						<div className="flex max-w-3xl flex-col items-start gap-6">
							<div className="flex flex-col gap-5">
								<h1 className="text-5xl font-bold text-balance sm:text-6xl">
									Every Ball
									<br />
									Every Player
									<br />
									Every Story
								</h1>
								<p className="max-w-xl text-xl text-pretty text-muted-foreground">
									Score local cricket without the clutter. Stumpr keeps matches, scorecards, and player stats together for your whole organization.
								</p>
							</div>
							<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
								<span>Ball-by-ball scoring</span>
								<span aria-hidden="true">•</span>
								<span>Safe undo</span>
								<span aria-hidden="true">•</span>
								<span>Team-wide access</span>
							</div>
							<div className="flex flex-col gap-3 sm:flex-row">
								<GoogleLogin size="lg" className="h-12 min-w-64" />
							</div>
						</div>

						<ScorecardPreview />
					</section>

					<section id="features" className="container scroll-mt-20 py-12 md:py-20">
						<div className="flex flex-col space-y-10">
							<div className="flex max-w-2xl flex-col gap-4">
								<h2 className="text-3xl font-bold text-balance sm:text-5xl">Everything your local cricket needs.</h2>
								<p className="text-xl text-pretty text-muted-foreground">Fast enough for the scorer, clear enough for everyone following along.</p>
							</div>

							<div className="grid gap-6 md:grid-cols-3">
								<FeatureCard
									icon={CloudOffIcon}
									title="Ready for patchy signals"
									description="Designed around local-first scoring so a weak connection never has to stop the match."
								/>
								<FeatureCard
									icon={RotateCcwIcon}
									title="Undo with confidence"
									description="Ball events stay the source of truth, making score corrections predictable and easy to follow."
								/>
								<FeatureCard
									icon={UsersIcon}
									title="One home for your club"
									description="Bring friends into an organization to share matches, scorecards, teams, and player stats."
								/>
							</div>
						</div>
					</section>

					<section id="how-it-works" className="container scroll-mt-20 py-12 md:py-20">
						<div className="grid gap-12 lg:grid-cols-2 lg:items-start">
							<div className="flex max-w-xl flex-col gap-4">
								<h2 className="text-3xl font-bold text-balance sm:text-5xl">From toss to scorecard in three steps.</h2>
								<p className="text-xl text-pretty text-muted-foreground">No setup maze. Create the match, pick your players, and start recording the action.</p>
							</div>

							<div className="grid gap-4">
								<Step
									number="1"
									title="Create your organization"
									description="Give your cricket group a shared space and invite the people who should follow along."
								/>
								<Step number="2" title="Set up the match" description="Choose the teams, players, format, and match details before the first delivery." />
								<Step number="3" title="Score every ball" description="Capture the action as it happens and let Stumpr build the scorecard." />
							</div>
						</div>
					</section>

					<section className="container space-y-10 py-12 md:py-20">
						<div className="relative overflow-hidden rounded-xl bg-linear-to-br from-accent to-accent/85 px-8 py-10 md:rounded-3xl md:p-20">
							<div className="mx-auto flex max-w-3xl flex-col items-center space-y-10 text-center text-white">
								<h2 className="mb-6! text-3xl font-bold text-balance sm:text-5xl">Your next match deserves a proper scorecard.</h2>
								<p className="text-xl text-pretty">Sign in with Google and start building your cricket history with Stumpr.</p>
								<GoogleLogin size="lg" variant="secondary" className="min-w-32" />
							</div>
						</div>
					</section>
				</main>

				<footer className="border-t">
					<div className="container flex flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
						<div className="flex items-center gap-1.5">
							<StumprIcon className="size-6" />
							<span className="text-2xl font-bold">Stumpr</span>
						</div>
						<p className="text-muted">Built for local teams and community cricket.</p>
					</div>
				</footer>
			</div>
		);
	},
});

function ScorecardPreview() {
	return (
		<div className="relative mx-auto w-full max-w-xl">
			<Card className="relative">
				<CardHeader>
					<div className="flex items-center justify-between gap-4">
						<div className="flex flex-col gap-1">
							<CardDescription>Community Ground · 2nd innings</CardDescription>
							<CardTitle>Friday Night Cricket</CardTitle>
						</div>
						<Badge>Live</Badge>
					</div>
				</CardHeader>
				<CardContent className="flex flex-col gap-6">
					<div className="grid gap-4">
						<TeamScore name="Street Strikers" score="148/6" overs="20.0 ov" />
						<Separator />
						<TeamScore name="Corner Kings" score="112/3" overs="15.2 ov" active />
					</div>

					<div className="bg-default rounded-lg p-4">
						<div className="flex items-center justify-between gap-4 text-sm">
							<span>Need 37 from 28 balls</span>
							<span className="font-medium tabular-nums">RR 7.30</span>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<span className="text-sm text-muted">This over</span>
						<div className="flex gap-2">
							{["1", "4", "0", "2"].map((ball) => (
								<div key={ball} className="bg-default inline-flex size-8 items-center justify-center rounded-full text-sm tabular-nums">
									{ball}
								</div>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function TeamScore({ name, score, overs, active = false }: { name: string; score: string; overs: string; active?: boolean }) {
	return (
		<div className="flex items-center justify-between gap-4">
			<div className="flex items-center gap-3">
				<Avatar size="lg">
					<AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col gap-0.5">
					<span className="font-medium">{name}</span>
					<span className="text-sm text-muted-foreground">{active ? "Batting" : "Innings complete"}</span>
				</div>
			</div>
			<div className="text-right">
				<p className="text-2xl font-semibold tracking-tight tabular-nums">{score}</p>
				<p className="text-sm text-muted-foreground tabular-nums">{overs}</p>
			</div>
		</div>
	);
}

function FeatureCard({ icon: Icon, title, description }: { icon: typeof CloudOffIcon; title: string; description: string }) {
	return (
		<Card>
			<CardHeader>
				<div className="mb-5 flex size-11 items-center justify-center rounded-lg bg-secondary">
					<Icon className="size-5" aria-hidden="true" />
				</div>
				<CardTitle className="text-xl font-semibold">{title}</CardTitle>
				<CardDescription className="leading-6 text-pretty">{description}</CardDescription>
			</CardHeader>
		</Card>
	);
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
	return (
		<Card>
			<CardHeader className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
				<div className="bg-default row-span-2 inline-flex size-8 items-center justify-center rounded-full text-sm tabular-nums">{number}</div>
				<CardTitle>{title}</CardTitle>
				<CardDescription className="leading-6 text-pretty">{description}</CardDescription>
			</CardHeader>
		</Card>
	);
}
