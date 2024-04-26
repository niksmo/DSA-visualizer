import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

export const enum LoadEnum {
	push = 1,
	pop
}

interface IProps {
	onPush: (value: string) => void;
	onPop: () => void;
	onClear: () => void;
	disableOptions: { push: boolean; pop: boolean };
	load: LoadEnum | false;
	extClassName?: string;
}

export function Manager({
	onPush,
	onPop,
	onClear,
	disableOptions,
	load,
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
				disabled={disableOptions.push || Boolean(load)}
			/>
			<Button
				type="submit"
				text="Добавить"
				name="add"
				extClassName="ml-6"
				loader={load === LoadEnum.push}
				disabled={disableOptions.push || Boolean(load)}
			/>
			<Button
				text="Удалить"
				data-testid="remove"
				extClassName="ml-6"
				loader={load === LoadEnum.pop}
				disabled={disableOptions.pop || Boolean(load)}
				onClick={onPop}
			/>
			<Button
				text="Очистить"
				data-testid="clear"
				extClassName="ml-40"
				disabled={disableOptions.pop || Boolean(load)}
				onClick={onClear}
			/>
		</form>
	);
}
