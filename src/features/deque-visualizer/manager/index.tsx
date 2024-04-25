import { clsx } from 'clsx';
import styles from './styles.module.css';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import { useState } from 'react';

interface IProps {
	onPushFront: (value: string) => void;
	onPopFront: () => void;
	onPushBack: (value: string) => void;
	onPopBack: () => void;
	onInsert: (idx: number, value: string) => void;
	onDelete: (idx: number) => void;
	minIndex: number;
	maxIndex: number;
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
		onPushFront(value);
		setValue('');
	};

	const handlePushBack = () => {
		onPushBack(value);
		setValue('');
	};

	const handleInsert = () => {
		onInsert(parseInt(index), value);
		setValue('');
		setIndex('');
	};

	const handleDelete = () => {
		onDelete(parseInt(index));
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
					disabled={false}
					data-testid="valueInput"
					onChange={handleValueChange}
				/>
				<Button
					text="Добавить в head"
					size="small"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={false}
					disabled={false}
					data-testid="addToHead"
					onClick={handlePushFront}
				/>
				<Button
					text="Добавить в tail"
					size="small"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={false}
					disabled={false}
					data-testid="addToTail"
					onClick={handlePushBack}
				/>
				<Button
					text="Удалить из head"
					size="small"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={false}
					disabled={false}
					data-testid="removeFromHead"
					onClick={onPopFront}
				/>
				<Button
					text="Удалить из tail"
					size="small"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={false}
					disabled={false}
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
					disabled={false}
					data-testid="indexInput"
					onChange={handleIndexChange}
				/>
				<Button
					text="Добавить по индексу"
					size="big"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={false}
					disabled={false}
					data-testid="addByIndex"
					onClick={handleInsert}
				/>
				<Button
					text="Удалить по индексу"
					size="big"
					extClassName={clsx(styles.controls__button, 'ml-6')}
					loader={false}
					disabled={false}
					data-testid="removeByIndex"
					onClick={handleDelete}
				/>
			</div>
		</form>
	);
}
