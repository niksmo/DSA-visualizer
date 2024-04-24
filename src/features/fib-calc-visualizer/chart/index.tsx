import { clsx } from 'clsx';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';
import type { RenderItem } from '../../../shared/helpers/entities';

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
