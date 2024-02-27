export type Provider = 'google' | 'github';
export const providers: Provider[] = ['google', 'github'];

export const SERVER_URL = 'http://localhost:3001';

export const redirectLinks = {
	google: '/auth/google',
	github: '/auth/github',
};

export const accessLinks = {
	google: '/auth/google/callback',
	github: '/auth/github/callback',
};
