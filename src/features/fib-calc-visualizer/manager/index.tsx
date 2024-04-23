import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

interface IProps {
	onSubmit: (inputValue: string) => void;
	disabled: boolean;
	extClassName?: string;
}

const NUM_PATTERN = /^[1-9]$|^1\d$|^\s*$/;

export function Manager({ onSubmit, disabled, extClassName }: IProps) {
	const [numValue, setNumValue] = useState('');

	const handleOnInput = (evt: React.FormEvent<HTMLInputElement>) => {
		const numValue = evt.currentTarget.value;

		NUM_PATTERN.test(numValue) && setNumValue(numValue);
	};

	const handleOnSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onSubmit(numValue);
	};

	return (
		<form
			className={clsx(styles.controls, extClassName)}
			onSubmit={handleOnSubmit}
		>
			<Input
				placeholder="Введите число"
				value={numValue}
				max={19}
				min={1}
				type="number"
				isLimitText
				extClassName={styles.controls__input}
				onChange={handleOnInput}
				disabled={disabled}
			/>
			<Button
				type="submit"
				text="Рассчитать"
				extClassName={clsx('ml-6', styles.controls__button)}
				loader={disabled}
				disabled={!numValue}
			/>
		</form>
	);
}
