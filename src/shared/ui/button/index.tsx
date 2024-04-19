import React from 'react';
import { clsx } from 'clsx';
import loaderIcon from './loader.svg';
import { AscendingIcon, DescendingIcon } from '../icons';
import styles from './styles.module.css';

const Icon = {
	Ascending: AscendingIcon,
	Descending: DescendingIcon
};

type IProps = React.HTMLProps<HTMLButtonElement> & {
	text?: string;
	type?: 'button' | 'submit' | 'reset';
	icon?: keyof typeof Icon;
	size?: 'small' | 'big';
	loader?: boolean;
	extClassName?: string;
};

export function Button({
	text,
	extClassName = '',
	type = 'button',
	icon,
	loader = false,
	size,
	disabled,
	...rest
}: IProps) {
	const CurrentIcon = icon && Icon[icon];

	const className = clsx(
		'text text_type_button text_color_primary',
		styles.button,
		size && styles[size],
		loader && styles.loader,
		extClassName
	);

	return (
		<button
			className={className}
			type={type}
			disabled={loader || disabled}
			{...rest}
		>
			{loader ? (
				<img className={styles.loader_icon} src={loaderIcon} alt="Загрузка." />
			) : (
				<>
					{CurrentIcon && <CurrentIcon />}
					<p className={clsx('text', CurrentIcon && 'ml-5')}>{text}</p>
				</>
			)}
		</button>
	);
}
