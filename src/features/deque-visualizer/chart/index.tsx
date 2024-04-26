import { clsx } from 'clsx';
import { ElementStates, RenderItem } from '../../../shared/helpers/entities';
import { Circle } from '../../../shared/ui/circle';
import { ArrowIcon } from '../../../shared/ui/icons';
import styles from './styles.module.css';

interface IProps {
	elements: RenderItem<string>[];
	extClassName?: string;
}

export function Chart({ elements, extClassName }: IProps) {
	const getHeadOrTail = (
		item: string | RenderItem<string> | null | undefined
	) => {
		if (!item) return;
		if (item instanceof RenderItem) {
			return <Circle small state={item.state} letter={item.value} />;
		}
		return String(item);
	};

	return (
		<ul className={clsx(styles.chart, extClassName)}>
			{elements.map(({ id, head, tail, state, value, passed }, index, array) => (
				<li key={id} className={styles.chart__item}>
					<Circle
						head={getHeadOrTail(head)}
						tail={getHeadOrTail(tail)}
						state={state}
						letter={value}
						index={index}
						extClassName={clsx(styles.chart__element, 'ml-8 mr-8')}
					/>
					{index !== array.length - 1 && (
						<ArrowIcon
							fill={passed ? ElementStates.Changing : ElementStates.Default}
						/>
					)}
				</li>
			))}
		</ul>
	);
}
