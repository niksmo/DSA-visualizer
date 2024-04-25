import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { useState } from 'react';
import styles from './styles.module.css';

interface IProps {
	onEnqueue: (value: string) => void;
	onDequeue: () => void;
	onClear: () => void;
	disableOptions: { enqueue: boolean; dequeue: boolean; clear: boolean };
	loadOptions: { enqueue: boolean; dequeue: boolean };
	extClassName?: string;
}

export function Manager({
	onEnqueue,
	onDequeue,
	onClear,
	disableOptions,
	loadOptions,
	extClassName
}: IProps) {
	const [inputValue, setInputValue] = useState('');

	const handleInput = (evt: React.FormEvent<HTMLInputElement>) => {
		setInputValue(evt.currentTarget.value);
	};

	const handleEnqueue = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const value = inputValue.trim();
		if (!value) return;

		onEnqueue(inputValue);
		setInputValue('');
	};

	return (
		<form
			className={clsx(styles.controls, extClassName)}
			onSubmit={handleEnqueue}
		>
			<Input
				name="Value"
				placeholder="Введите значение"
				value={inputValue}
				maxLength={4}
				isLimitText
				extClassName={styles.controls__input}
				onChange={handleInput}
				disabled={disableOptions.enqueue}
			/>
			<Button
				type="submit"
				text="Добавить"
				extClassName="ml-6"
				loader={loadOptions.enqueue}
				disabled={disableOptions.enqueue}
			/>
			<Button
				data-testid="remove"
				text="Удалить"
				extClassName="ml-6"
				loader={loadOptions.dequeue}
				disabled={disableOptions.dequeue}
				onClick={onDequeue}
			/>
			<Button
				data-testid="clear"
				text="Очистить"
				extClassName="ml-40"
				disabled={disableOptions.clear}
				onClick={onClear}
			/>
		</form>
	);
}
