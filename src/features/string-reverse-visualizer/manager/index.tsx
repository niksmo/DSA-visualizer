import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

interface IProps {
	onSubmit: (string: string) => void;
	disabled: boolean;
	extClassName?: string;
}

export function Manager({ onSubmit, disabled, extClassName }: IProps) {
	const [stringValue, setStringValue] = useState('');

	const handleOnInput = (evt: React.FormEvent<HTMLInputElement>) => {
		setStringValue(evt.currentTarget.value);
	};

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onSubmit(stringValue);
	};

	return (
		<form className={clsx(styles.controls, extClassName)} onSubmit={handleSubmit}>
			<Input
				name="String"
				spellCheck={false}
				autoComplete="off"
				value={stringValue}
				maxLength={11}
				isLimitText
				extClassName={styles.controls__input}
				onChange={handleOnInput}
				disabled={disabled}
			/>
			<Button
				type="submit"
				text="Развернуть"
				extClassName={clsx('ml-6', styles.controls__button)}
				loader={disabled}
				disabled={!stringValue}
			/>
		</form>
	);
}
