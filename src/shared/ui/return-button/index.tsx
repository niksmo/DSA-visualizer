import React from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';
import { ReturnIcon } from '../icons';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
	type?: 'button' | 'submit' | 'reset';
	extClassName?: string;
}

export const ReturnButton: React.FC<ButtonProps> = ({
	extClassName = '',
	...rest
}) => {
	return (
		<button className={clsx(styles.button, extClassName)} type="button" {...rest}>
			<ReturnIcon />
			<p className="text text_type_button text_color_link ml-4">К оглавлению</p>
		</button>
	);
};
