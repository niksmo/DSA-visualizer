import React from 'react';
import { clsx } from 'clsx';
import { TArrayItem } from '../../../shared/types';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';

interface IReverseChart {
	elements: TArrayItem<string>[];
	extClassName?: string;
}

export const ReverseChart: React.FC<IReverseChart> = ({
	elements,
	extClassName
}) => (
	<div
		className={clsx(styles.reverseChart, extClassName)}
		data-testid="reverseChart"
	>
		{elements.map(({ value, id, state }) => (
			<Circle key={id} letter={value} state={state} />
		))}
	</div>
);
