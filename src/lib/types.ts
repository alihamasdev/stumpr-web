export type Organization = {
	id: string;
	name: string;
	slug: string;
	createdAt: number;
	logo: string | null;
	metadata: string | null;
};

export type User = {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	emailVerified: boolean;
	image?: string | null;
};
