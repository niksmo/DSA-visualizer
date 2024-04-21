import React from 'react';
import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

interface IProps {
	value: string;
	onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
	onSubmit: (evt: React.FormEvent) => void;
	disabled: boolean;
	extClassName?: string;
}

export function Manager({
	value,
	onChange,
	onSubmit,
	disabled,
	extClassName
}: IProps) {
	return (
		<form className={clsx(styles.controls, extClassName)} onSubmit={onSubmit}>
			<Input
				placeholder="Введите число"
				value={value}
				max={19}
				min={1}
				type="number"
				isLimitText
				extClassName={styles.controls__input}
				onChange={onChange}
				disabled={disabled}
			/>
			<Button
				type="submit"
				text="Рассчитать"
				extClassName={clsx('ml-6', styles.controls__button)}
				loader={disabled}
			/>
		</form>
	);
}
