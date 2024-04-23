import { clsx } from 'clsx';
import type { TArrayItem } from '../../../shared/types';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';

interface IProps {
	elements: TArrayItem<string>[];
	extClassName?: string;
}

export function Chart({ elements, extClassName }: IProps) {
	return (
		<div
			className={clsx(styles.reverseChart, extClassName)}
			data-testid="reverseChart"
		>
			{elements.map(({ value, id, state }) => (
				<Circle key={id} letter={value} state={state} />
			))}
		</div>
	);
}
