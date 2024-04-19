import React from 'react';
import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

interface IProps {
	value: string;
	onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
	onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
	disabled: boolean;
	extClassName?: string;
}

export function ReverseManager({
	value,
	onChange,
	onSubmit,
	disabled,
	extClassName
}: IProps) {
	return (
		<form
			className={clsx(styles.controls, extClassName)}
			onSubmit={value ? onSubmit : undefined}
		>
			<Input
				spellCheck={false}
				autoComplete="off"
				value={value}
				maxLength={11}
				isLimitText
				extClassName={styles.controls__input}
				onChange={onChange}
				disabled={disabled}
			/>
			<Button
				type="submit"
				text="Развернуть"
				extClassName={clsx('ml-6', styles.controls__button)}
				loader={disabled}
				disabled={value === ''}
			/>
		</form>
	);
}
