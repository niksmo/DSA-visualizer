import React from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
	placeholder?: string;
	extClassName?: string;
	isLimitText?: boolean;
}

export const Input: React.FC<InputProps> = ({
	placeholder = 'Введите текст',
	extClassName = '',
	type = 'text',
	maxLength,
	max,
	isLimitText = false,
	...rest
}) => {
	const limitText =
		type === 'text'
			? `Максимум символов — ${maxLength}`
			: `Максимальное число — ${max}`;

	return (
		<div className={clsx(styles.content, extClassName)}>
			<input
				className={`${styles.input} text text_type_input text_color_input`}
				placeholder={placeholder}
				type={type}
				maxLength={maxLength}
				max={max}
				autoComplete="off"
				{...rest}
			/>
			{isLimitText && (
				<span
					className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}
				>
					{limitText}
				</span>
			)}
		</div>
	);
};
