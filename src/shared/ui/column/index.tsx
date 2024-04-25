import type React from 'react';
import { clsx } from 'clsx';
import { ElementStates } from '../../types';
import styles from './styles.module.css';

interface ColumnProps {
	elevation: number;
	state?: ElementStates;
	compareWith?: number | string | React.ReactElement | null;
	extClassName?: string;
}

export function Column({
	elevation,
	state = ElementStates.Default,
	compareWith,
	extClassName = ''
}: ColumnProps) {
	return (
		<div className={clsx(styles.content, extClassName)}>
			<div
				className={`${styles.column} ${styles[state]}`}
				style={{ height: 280 * elevation * 0.01 || 1 }}
			/>
			<p className={`text text_type_column text_color_input mt-3`}>{elevation}</p>
			<div className={styles.stored}>{compareWith}</div>
		</div>
	);
}
