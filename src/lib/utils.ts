export { cn } from "cnfast";

export function getInitials(name: string): string {
	const words = name.trim().split(/\s+/);

	const [first, second] = words;

	if (!first) {
		return "";
	}

	if (second) {
		return (first[0] + second[0]).toUpperCase();
	}

	return first.length >= 2 ? first.slice(0, 2).toUpperCase() : first.toUpperCase();
}

export function getErrorMessage(error: unknown): string | undefined;
export function getErrorMessage(error: unknown, fallBack: string): string;
export function getErrorMessage(error: unknown, fallBack?: string): string | undefined {
	if (typeof error === "string") {
		return error;
	}

	if (Array.isArray(error)) {
		for (const issue of error) {
			const message = getErrorMessage(issue);
			if (message) {
				return message;
			}
		}
		return fallBack;
	}

	if (typeof error === "object" && error !== null) {
		const maybeError = error as { message?: unknown };
		if (typeof maybeError.message === "string") {
			return maybeError.message;
		}
	}

	return fallBack;
}
