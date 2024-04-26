import { clsx } from 'clsx';
import type { RenderItem } from '../../../shared/helpers/entities';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';

interface IProps {
	elements: RenderItem[];
	extClassName?: string;
}

export function Chart({ elements, extClassName }: IProps) {
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
