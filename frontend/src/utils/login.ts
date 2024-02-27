import { Provider, SERVER_URL, accessLinks, redirectLinks } from '@/configs';

export const handleGetRedirect = async (
	provider: Provider
): Promise<string> => {
	const res = await fetch(SERVER_URL + redirectLinks[provider]);
	if (res.ok) {
		const { result } = await res.json();
		const { urlRedirect } = result;
		return urlRedirect;
	}
	return '';
};

export const handleCallback = async (
	provider: Provider,
	thisUrl: string
): Promise<string> => {
	const queryParams = thisUrl.slice(thisUrl.indexOf('?') + 1);
	const res = await fetch(
		SERVER_URL + accessLinks[provider] + '?' + queryParams
	);
	if (res.ok) {
		const { accessToken } = await res.json();
		return accessToken;
	}
	return '';
};
