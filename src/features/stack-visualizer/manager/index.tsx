import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

interface IProps {
	onPush: (value: string) => void;
	onPop: () => void;
	onClear: () => void;
	disableOptions: { push: boolean; pop: boolean; clear: boolean };
	loadOptions: { push: boolean; pop: boolean };
	extClassName?: string;
}

export function Manager({
	onPush,
	onPop,
	onClear,
	disableOptions,
	loadOptions,
	extClassName
}: IProps) {
	const [inputValue, setInputValue] = useState('');

	const handleInput = (evt: React.FormEvent<HTMLInputElement>) => {
		setInputValue(evt.currentTarget.value);
	};

	const handlePush = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const value = inputValue.trim();
		if (!value) return;

		onPush(inputValue);
		setInputValue('');
	};

	return (
		<form className={clsx(styles.controls, extClassName)} onSubmit={handlePush}>
			<Input
				name="Value"
				placeholder="Введите значение"
				value={inputValue}
				maxLength={4}
				isLimitText
				extClassName={styles.controls__input}
				onChange={handleInput}
				disabled={disableOptions.push}
			/>
			<Button
				type="submit"
				text="Добавить"
				name="add"
				extClassName="ml-6"
				loader={loadOptions.push}
				disabled={disableOptions.push}
			/>
			<Button
				text="Удалить"
				data-testid="remove"
				extClassName="ml-6"
				loader={loadOptions.pop}
				disabled={disableOptions.pop}
				onClick={onPop}
			/>
			<Button
				text="Очистить"
				data-testid="clear"
				extClassName="ml-40"
				disabled={disableOptions.clear}
				onClick={onClear}
			/>
		</form>
	);
}
