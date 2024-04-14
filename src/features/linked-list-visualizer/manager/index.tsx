import React from 'react';
import { clsx } from 'clsx';
import { TAnimationType } from '../utils';
import styles from './styles.module.css';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';

interface ILinkedListManagerProps {
	value: string;
	index: string;
	listLength: number;
	maxSize: number;
	animation: TAnimationType;
	onValueChange: (evt: React.FormEvent<HTMLInputElement>) => void;
	onIndexChange: (evt: React.FormEvent<HTMLInputElement>) => void;
	onAddInHead: () => void;
	onAddInTail: () => void;
	onDeleteFromHead: () => void;
	onDeleteFromTail: () => void;
	onAddByIndex: () => void;
	onDeleteByIndex: () => void;
	extClassName?: string;
}

export const LinkedListManager: React.FC<ILinkedListManagerProps> = ({
	value,
	index,
	listLength,
	maxSize,
	animation,
	onValueChange,
	onIndexChange,
	onAddInHead,
	onAddInTail,
	onDeleteFromHead,
	onDeleteFromTail,
	onAddByIndex,
	onDeleteByIndex,
	extClassName
}) => (
	<form className={clsx(styles.controls, extClassName)}>
		<div className={styles.controls__row}>
			<Input
				placeholder="Введите значение"
				name="value"
				value={value}
				maxLength={4}
				isLimitText
				extClassName={styles.controls__input}
				disabled={listLength === maxSize || animation !== null}
				data-testid="valueInput"
				onChange={onValueChange}
			/>
			<Button
				text="Добавить в head"
				linkedList="small"
				extClassName={clsx(styles.controls__button, 'ml-6')}
				isLoader={animation === 'prepend'}
				disabled={value === '' || listLength === maxSize || animation !== null}
				data-testid="addToHead"
				onClick={onAddInHead}
			/>
			<Button
				text="Добавить в tail"
				linkedList="small"
				extClassName={clsx(styles.controls__button, 'ml-6')}
				isLoader={animation === 'append'}
				disabled={value === '' || listLength === maxSize || animation !== null}
				data-testid="addToTail"
				onClick={onAddInTail}
			/>
			<Button
				text="Удалить из head"
				linkedList="small"
				extClassName={clsx(styles.controls__button, 'ml-6')}
				isLoader={animation === 'deleteHead'}
				disabled={listLength === 0 || animation !== null}
				data-testid="removeFromHead"
				onClick={onDeleteFromHead}
			/>
			<Button
				text="Удалить из tail"
				linkedList="small"
				extClassName={clsx(styles.controls__button, 'ml-6')}
				isLoader={animation === 'deleteTail'}
				disabled={listLength === 0 || animation !== null}
				data-testid="removeFromTail"
				onClick={onDeleteFromTail}
			/>
		</div>
		<div className={clsx(styles.controls__row, 'mt-6')}>
			<Input
				placeholder="Введите индекс"
				name="index"
				value={index}
				type="number"
				min={0}
				max={listLength ? listLength - 1 : 0}
				extClassName={styles.controls__input}
				disabled={animation !== null || listLength === 0}
				data-testid="indexInput"
				onChange={onIndexChange}
			/>
			<Button
				text="Добавить по индексу"
				linkedList="big"
				extClassName={clsx(styles.controls__button, 'ml-6')}
				isLoader={animation === 'addByIndex'}
				disabled={
					value === '' ||
					!index ||
					listLength === maxSize ||
					animation !== null ||
					Number(index) > listLength - 1
				}
				data-testid="addByIndex"
				onClick={onAddByIndex}
			/>
			<Button
				text="Удалить по индексу"
				linkedList="big"
				extClassName={clsx(styles.controls__button, 'ml-6')}
				isLoader={animation === 'deleteByIndex'}
				disabled={
					!index ||
					listLength === 0 ||
					animation !== null ||
					Number(index) > listLength - 1
				}
				data-testid="removeByIndex"
				onClick={onDeleteByIndex}
			/>
		</div>
	</form>
);
