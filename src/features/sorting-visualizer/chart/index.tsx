import { clsx } from 'clsx';
import { TArrayItem } from '../../../shared/types';
import { Column } from '../../../shared/ui/column';
import styles from './styles.module.css';

interface IProps {
	elements: TArrayItem[];
	extClassName?: string;
}

export function SortingChart({ elements, extClassName }: IProps) {
	return (
		<div className={clsx(styles.sortingChart, extClassName)}>
			{elements.map((item) => (
				<Column
					key={item.id}
					elevation={item.value}
					state={item.state}
					extClassName={clsx(styles.sortingChart__scale, 'mr-5')}
				/>
			))}
		</div>
	);
}
