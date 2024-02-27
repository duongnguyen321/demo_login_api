'use client';
import Button from '@/components/Button';
import { Provider } from '@/configs';
import { handleCallback } from '@/utils/login';
import React, { useEffect } from 'react';

export default function Auth({ params }: { params: { provider: Provider } }) {
	const { provider } = params;
	const getAccessToken = async () => {
		const accessToken = await handleCallback(provider, window.location.href);
		if (accessToken) {
			localStorage.accessToken = accessToken;
			window.location.href = '/';
		}
	};
	useEffect(() => {
		getAccessToken();
	}, []);
	return (
		<>
			<h1>redirecting...</h1>
			<Button onClick={() => (window.location.href = '/')}>Go Home!</Button>
		</>
	);
}
