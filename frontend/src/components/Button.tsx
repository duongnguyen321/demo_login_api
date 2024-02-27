import React from 'react';

export default function Button({
	children,
	type,
	onClick,
	...props
}: {
	children: React.ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
}) {
	return (
		<button
			type={type || 'button'}
			onClick={onClick}
			className='p-4 border-white border-2 rounded-sm'
			{...props}
		>
			{children}
		</button>
	);
}
