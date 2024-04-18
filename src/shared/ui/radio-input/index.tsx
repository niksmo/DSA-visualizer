import React from 'react';
import { clsx } from 'clsx';
import { nanoid } from 'nanoid';
import styles from './styles.module.css';

interface RadioProps extends React.HTMLProps<HTMLInputElement> {
	label: string;
	extClassName?: string;
}

export const RadioInput: React.FC<RadioProps> = ({
	label = 'Введите текст',
	extClassName = '',
	...rest
}) => {
	const id = nanoid();

	return (
		<div className={clsx(styles.content, extClassName)}>
			<input className={styles.input} type="radio" id={id} {...rest} />
			<label className={`text text_type_button ${styles.label}`} htmlFor={id}>
				{label}
			</label>
		</div>
	);
};
