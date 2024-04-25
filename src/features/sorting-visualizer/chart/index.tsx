import { clsx } from 'clsx';
import { Column } from '../../../shared/ui/column';
import { RenderItem } from '../../../shared/helpers/entities';
import styles from './styles.module.css';
import { Circle } from '../../../shared/ui/circle';

interface IProps {
	elements: RenderItem[];
	extClassName?: string;
}

export function Chart({ elements, extClassName }: IProps) {
	return (
		<div className={clsx(styles.sortingChart, extClassName)}>
			{elements.map((item) => (
				<Column
					key={item.id}
					elevation={item.value}
					state={item.state}
					extClassName={clsx(styles.sortingChart__scale, 'mr-5')}
					compareWith={
						item.tail instanceof RenderItem ? (
							<Circle small letter={String(item.tail.value)} state={item.tail.state} />
						) : null
					}
				/>
			))}
		</div>
	);
}
