import { SERVER_URL } from '@/configs';

export interface Profile {
	id: string;
	name: string;
	email: string;
	thumbnail: string;
	[key: string]: any;
}
export default async function getProfile(
	accessToken: string
): Promise<Profile | null> {
	const res = await fetch(SERVER_URL + '/auth/profile', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (res.ok) {
		const { result } = await res.json();
		return result;
	}
	return null;
}
