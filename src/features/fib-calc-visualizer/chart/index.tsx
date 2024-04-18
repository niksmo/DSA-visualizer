import { clsx } from 'clsx';
import { TArrayItem } from '../../../shared/types';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';

interface IProps {
	elements: TArrayItem[];
	extClassName?: string;
}

export function FibChart({ elements, extClassName }: IProps) {
	return (
		<div className={clsx(styles.chart, extClassName)}>
			{elements.map((item, index) => (
				<Circle
					letter={String(item.value)}
					index={index}
					key={item.id}
					extClassName={clsx(styles.chart__element, 'mr-8')}
				/>
			))}
		</div>
	);
}
