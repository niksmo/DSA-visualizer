import { clsx } from 'clsx';
import { ElementStates } from '../../../shared/types';
import { Circle } from '../../../shared/ui/circle';
import { ArrowIcon } from '../../../shared/ui/icons';
import type { RenderItem } from '../../../shared/helpers/entities';
import styles from './styles.module.css';

interface IProps {
	elements: RenderItem<string>[];
	extClassName?: string;
}

export function Chart({ elements, extClassName }: IProps) {
	const getHead = (headValue: string | null) => {
		//bug if user set 'head' value for list item
		if (headValue === 'head') {
			return headValue;
		}

		if (headValue) {
			return <Circle small letter={headValue} state={ElementStates.Changing} />;
		}

		return headValue;
	};

	const getTail = (tailValue: string | null) => {
		if (tailValue === 'tail') {
			//bug if user set 'tail' value for list item
			return tailValue;
		}

		if (tailValue) {
			return <Circle small letter={tailValue} state={ElementStates.Changing} />;
		}

		return tailValue;
	};

	return (
		<ul className={clsx(styles.chart, extClassName)}>
			{elements.map((item, index, array) => (
				<li key={item.id} className={styles.chart__item}>
					<Circle
						head={getHead(item.head!)}
						tail={getTail(item.tail!)}
						state={item.state}
						letter={item.value}
						index={index}
						extClassName={clsx(styles.chart__element, 'ml-8 mr-8')}
					/>
					{index !== array.length - 1 && (
						<ArrowIcon
							fill={item.passed ? ElementStates.Changing : ElementStates.Default}
						/>
					)}
				</li>
			))}
		</ul>
	);
}
