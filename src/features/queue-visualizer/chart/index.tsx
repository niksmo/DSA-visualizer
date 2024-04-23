import { clsx } from 'clsx';
import { Circle } from '../../../shared/ui/circle';
import type { ArrayItem } from '../../../shared/helpers/entities';
import styles from './styles.module.css';

interface IProps {
	elements: ArrayItem<string>[];
	extClassName?: string;
}

export function Chart({ elements, extClassName }: IProps) {
	return (
		<div className={clsx(styles.chart, extClassName)}>
			{elements.map(({ id, state, head, tail, value }, index) => (
				<Circle
					key={id}
					state={state}
					head={head}
					tail={tail}
					letter={value}
					index={index}
					extClassName={clsx(styles.chart__element, 'mr-8')}
				/>
			))}
		</div>
	);
}
