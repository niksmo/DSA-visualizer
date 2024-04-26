import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { useState } from 'react';
import styles from './styles.module.css';

export const enum LoadEnum {
	enqueue = 1,
	dequeue
}

interface IProps {
	onEnqueue: (value: string) => void;
	onDequeue: () => void;
	onClear: () => void;
	disableOptions: { enqueue: boolean; dequeue: boolean };
	load: LoadEnum | false;
	extClassName?: string;
}

export function Manager({
	onEnqueue,
	onDequeue,
	onClear,
	disableOptions,
	load,
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
				disabled={disableOptions.enqueue || Boolean(load)}
			/>
			<Button
				type="submit"
				text="Добавить"
				extClassName="ml-6"
				loader={load === LoadEnum.enqueue}
				disabled={disableOptions.enqueue || Boolean(load)}
			/>
			<Button
				data-testid="remove"
				text="Удалить"
				extClassName="ml-6"
				loader={load === LoadEnum.dequeue}
				disabled={disableOptions.dequeue || Boolean(load)}
				onClick={onDequeue}
			/>
			<Button
				data-testid="clear"
				text="Очистить"
				extClassName="ml-40"
				disabled={disableOptions.dequeue || Boolean(load)}
				onClick={onClear}
			/>
		</form>
	);
}
