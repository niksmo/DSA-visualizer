import React from 'react';
import { clsx } from 'clsx';
import { TArrayItem } from '../../../shared/types';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';

interface IStackChartProps {
	elements: TArrayItem<string>[];
	extClassName?: string;
}

export const StackChart: React.FC<IStackChartProps> = ({
	elements,
	extClassName
}) => (
	<div className={clsx(styles.chart, extClassName)}>
		{elements.map(({ value, id, state }, index, arr) => (
			<Circle
				key={id}
				state={state}
				head={index === arr.length - 1 ? 'top' : null}
				letter={value}
				index={index}
				extClassName={clsx(styles.chart__element, 'mr-8')}
			/>
		))}
	</div>
);
