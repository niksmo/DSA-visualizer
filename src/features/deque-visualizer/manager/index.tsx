import { clsx } from 'clsx';
import styles from './styles.module.css';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { useState } from 'react';

export const enum LoadEnum {
	pushFront = 1,
	popFront,
	pushBack,
	popBack,
	insert,
	delete
}

interface IProps {
	onPushFront: (value: string) => void;
	onPopFront: () => void;
	onPushBack: (value: string) => void;
	onPopBack: () => void;
	onInsert: (idx: number, value: string) => void;
	onDelete: (idx: number) => void;
	minIndex: number;
	maxIndex: number;
	disableOptions: { push: boolean; pop: boolean };
	load: LoadEnum | false;
	extClassName?: string;
}

export function Manager({
	onPushFront,
	onPopFront,
	onPushBack,
	onPopBack,
	onInsert,
	onDelete,
	minIndex,
	maxIndex,
	disableOptions,
	load = false,
	extClassName
}: IProps) {
	const [value, setValue] = useState('');
	const [index, setIndex] = useState('');

	const handleValueChange = (evt: React.FormEvent<HTMLInputElement>) => {
		setValue(evt.currentTarget.value);
	};

	const handleIndexChange = (evt: React.FormEvent<HTMLInputElement>) => {
		const value = evt.currentTarget.value;

		Number(value) >= minIndex &&
			Number(value) <= maxIndex &&
			value.length <= String(maxIndex).length &&
			setIndex(evt.currentTarget.value);
	};

	const handlePushFront = () => {
		if (!value.length) return;
		onPushFront(value);
		setValue('');
	};

	const handlePushBack = () => {
		if (!value.length) return;
		onPushBack(value);
		setValue('');
	};

	const handleInsert = () => {
		if (!value.length || !index.length) return;
		onInsert(parseInt(index), value);
		setValue('');
		setIndex('');
	};

	const handleDelete = () => {
		if (!index.length) return;
		onDelete(parseInt(index));
		setIndex('');
	};

	return (
		<form className={clsx(styles.controls, extClassName)}>
			<div className={styles.controls__row}>
				<Input
					placeholder="Введите значение"
					name="value"
					value={value}
					maxLength={4}
					isLimitText
					extClassName={styles.controls__input}
					disabled={Boolean(load) || disableOptions.push}
					data-testid="valueInput"
					onChange={handleValueChange}
				/>
				<Button
					text="Добавить в head"
					size="small"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={load === LoadEnum.pushFront}
					disabled={Boolean(load) || disableOptions.push}
					data-testid="addToHead"
					onClick={handlePushFront}
				/>
				<Button
					text="Добавить в tail"
					size="small"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={load === LoadEnum.pushBack}
					disabled={Boolean(load) || disableOptions.push}
					data-testid="addToTail"
					onClick={handlePushBack}
				/>
				<Button
					text="Удалить из head"
					size="small"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={load === LoadEnum.popFront}
					disabled={Boolean(load) || disableOptions.pop}
					data-testid="removeFromHead"
					onClick={onPopFront}
				/>
				<Button
					text="Удалить из tail"
					size="small"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={load === LoadEnum.popBack}
					disabled={Boolean(load) || disableOptions.pop}
					data-testid="removeFromTail"
					onClick={onPopBack}
				/>
			</div>
			<div className={clsx(styles.controls__row, 'mt-6')}>
				<Input
					placeholder="Введите индекс"
					name="index"
					value={index}
					type="number"
					min={minIndex}
					max={maxIndex}
					extClassName={styles.controls__input}
					disabled={Boolean(load)}
					data-testid="indexInput"
					onChange={handleIndexChange}
				/>
				<Button
					text="Добавить по индексу"
					size="big"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={load === LoadEnum.insert}
					disabled={Boolean(load) || disableOptions.push}
					data-testid="addByIndex"
					onClick={handleInsert}
				/>
				<Button
					text="Удалить по индексу"
					size="big"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={load === LoadEnum.delete}
					disabled={Boolean(load) || disableOptions.pop}
					data-testid="removeByIndex"
					onClick={handleDelete}
				/>
			</div>
		</form>
	);
}
