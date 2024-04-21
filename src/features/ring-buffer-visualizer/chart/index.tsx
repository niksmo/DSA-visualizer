import { clsx } from 'clsx';
import { TArrayItem } from '../../../shared/types';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';

interface IProps {
	elements: TArrayItem<string>[];
	extClassName?: string;
}

export function Chart({ elements, extClassName }: IProps) {
	return (
		<div className={clsx(styles.chart, extClassName)}>
			{elements.map((item, index) => (
				<Circle
					key={item.id}
					state={item.state}
					head={item.head}
					tail={item.tail}
					letter={item.value}
					index={index}
					extClassName={clsx(styles.chart__element, 'mr-8')}
				/>
			))}
		</div>
	);
}
