'use client';
import Button from '@/components/Button';
import { Provider } from '@/configs';
import { handleGetRedirect } from '@/utils/login';
import getProfile, { Profile } from '@/utils/profile';
import { useEffect, useState } from 'react';

export default function Home() {
	const [profile, setProfile] = useState<Profile>();
	const handleRedirect = async (provider: Provider) => {
		const redirect = await handleGetRedirect(provider);
		if (redirect) {
			window.location.href = redirect;
		}
	};
	const handleLogin = async (accessToken: string) => {
		const profile = await getProfile(accessToken);
		if (profile) {
			setProfile(profile);
		} else {
			localStorage.removeItem('accessToken');
		}
	};
	useEffect(() => {
		if (localStorage.accessToken) {
			handleLogin(localStorage.accessToken);
		}
	}, []);
	return (
		<div className='flex items-center flex-col gap-4 mt-4'>
			{!profile ? (
				<>
					<Button onClick={() => handleRedirect('google')}>
						Nút này để đăng nhập với Google
					</Button>
					<Button onClick={() => handleRedirect('github')}>
						Nút này để đăng nhập với Github
					</Button>
				</>
			) : (
				<ul>
					<li>id: {profile.id}</li>
					<li>name: {profile.name}</li>
					<li>email: {profile.email}</li>
					<img src={profile.thumbnail} alt={profile.name} />
				</ul>
			)}
		</div>
	);
}
