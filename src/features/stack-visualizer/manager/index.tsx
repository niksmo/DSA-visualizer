import React from 'react';
import { clsx } from 'clsx';
import { TActionType } from '../utils';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

interface IStackManagerProps {
	value: string;
	stackSize: number;
	stackMaxSize: number;
	action: TActionType;
	onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
	onAdd: (evt: React.FormEvent) => void;
	onDelete: () => void;
	onClear: () => void;
	extClassName?: string;
}

export const StackManager: React.FC<IStackManagerProps> = ({
	value,
	stackSize,
	stackMaxSize,
	action,
	onChange,
	onAdd,
	onDelete,
	onClear,
	extClassName
}) => (
	<form className={clsx(styles.controls, extClassName)} onSubmit={onAdd}>
		<Input
			value={value}
			maxLength={4}
			isLimitText
			extClassName={styles.controls__input}
			onChange={onChange}
			disabled={stackSize === stackMaxSize}
		/>
		<Button
			type="submit"
			text="Добавить"
			name="add"
			extClassName="ml-6"
			loader={action === 'add'}
			disabled={Boolean(action) || !value || stackSize === stackMaxSize}
		/>
		<Button
			text="Удалить"
			data-testid="remove"
			extClassName="ml-6"
			loader={action === 'delete'}
			disabled={stackSize === 0}
			onClick={onDelete}
		/>
		<Button
			text="Очистить"
			data-testid="clear"
			extClassName="ml-40"
			disabled={stackSize === 0}
			onClick={onClear}
		/>
	</form>
);
