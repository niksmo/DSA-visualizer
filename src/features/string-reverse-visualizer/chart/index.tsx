import { clsx } from 'clsx';
import type { RenderItem } from '../../../shared/helpers/entities';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';

interface IProps {
	elements: RenderItem<string>[];
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
