import { clsx } from 'clsx';
import { ElementStates } from '../../types';
import styles from './styles.module.css';
import { Circle } from '../circle';

interface ColumnProps {
	elevation: number;
	state?: ElementStates;
	compareWith?: number | string | null;
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
			<div className={styles.stored}>
				{compareWith && (
					<Circle
						small
						letter={String(compareWith)}
						state={ElementStates.Changing}
					/>
				)}
			</div>
		</div>
	);
}
