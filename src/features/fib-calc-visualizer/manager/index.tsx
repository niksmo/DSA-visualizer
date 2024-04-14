import React from 'react';
import { clsx } from 'clsx';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

interface IFibManagerProps {
	value: string;
	onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
	onSubmit: (evt: React.FormEvent) => void;
	isDisabled: boolean;
	extClassName?: string;
}

export const FibManager: React.FC<IFibManagerProps> = ({
	value,
	onChange,
	onSubmit,
	isDisabled,
	extClassName
}) => (
	<form className={clsx(styles.controls, extClassName)} onSubmit={onSubmit}>
		<Input
			placeholder="Введите число"
			value={value}
			max={19}
			min={1}
			type="number"
			isLimitText
			extClassName={styles.controls__input}
			onChange={onChange}
			disabled={isDisabled}
		/>
		<Button
			type="submit"
			text="Рассчитать"
			extClassName={clsx('ml-6', styles.controls__button)}
			isLoader={isDisabled}
			disabled={value === '' || Number(value) < 1 || Number(value) > 19}
		/>
	</form>
);
