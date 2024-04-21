import React, { useState } from 'react';
import { clsx } from 'clsx';
import { RadioInput } from '../../../shared/ui/radio-input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';
import {
	SORT_METHOD,
	SORT_TYPE,
	TSortMethodUnion,
	TSortTypeUnion
} from '../lib';

interface IProps {
	disabled: boolean;
	onSort: (sortMethod: TSortMethodUnion, sortType: TSortTypeUnion) => void;
	onNewArray: () => void;
}

export function SortManager({ onNewArray, disabled, onSort }: IProps) {
	const [sortType, setSortType] = useState<TSortTypeUnion>('non-decreasing');
	const [sortMethod, setSortMethod] = useState<TSortMethodUnion>('selection');

	const handleButtonClick = (
		evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const { value } = evt.currentTarget;
		const sortType = value as TSortTypeUnion;
		setSortType(sortType);
		onSort(sortMethod, sortType);
	};

	const handleMethodChange = (evt: React.FormEvent<HTMLInputElement>) => {
		const { value } = evt.currentTarget;
		const sortMethod = value as TSortMethodUnion;
		setSortMethod(sortMethod);
	};

	return (
		<form className={styles.controls}>
			<RadioInput
				label="Выбором"
				name="sortType"
				value={SORT_METHOD.SELECTION}
				disabled={disabled}
				checked={sortMethod === SORT_METHOD.SELECTION}
				onChange={handleMethodChange}
			/>
			<RadioInput
				extClassName="ml-10"
				label="Пузырьком"
				name="sortType"
				value={SORT_METHOD.BUBBLE}
				disabled={disabled}
				checked={sortMethod === SORT_METHOD.BUBBLE}
				onChange={handleMethodChange}
			/>
			<RadioInput
				extClassName="ml-10"
				label="Вставками"
				name="sortType"
				value={SORT_METHOD.INSERTION}
				disabled={disabled}
				checked={sortMethod === SORT_METHOD.INSERTION}
				onChange={handleMethodChange}
			/>
			<Button
				extClassName={clsx(styles.controls__button, 'ml-25')}
				icon="Ascending"
				text="По неубыванию"
				name={SORT_TYPE.NON_DECREASING}
				value={SORT_TYPE.NON_DECREASING}
				disabled={disabled}
				loader={disabled && sortType === SORT_TYPE.NON_DECREASING}
				onClick={handleButtonClick}
			/>
			<Button
				extClassName={clsx(styles.controls__button, 'ml-6')}
				icon="Descending"
				text="По невозрастанию"
				name={SORT_TYPE.NON_INCREASIGN}
				value={SORT_TYPE.NON_INCREASIGN}
				disabled={disabled}
				loader={disabled && sortType === SORT_TYPE.NON_INCREASIGN}
				onClick={handleButtonClick}
			/>
			<Button
				extClassName={clsx(styles.controls__button, 'ml-40')}
				text="Новый массив"
				disabled={disabled}
				onClick={onNewArray}
			/>
		</form>
	);
}
