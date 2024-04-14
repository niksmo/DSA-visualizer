import React from 'react';
import { ElementStates } from '../../types';
import styles from './styles.module.css';

interface ColumnProps {
	elevation: number;
	state?: ElementStates;
	extClassName?: string;
}

export const Column: React.FC<ColumnProps> = ({
	elevation,
	state = ElementStates.Default,
	extClassName = ''
}) => (
	<div className={`${styles.content} ${extClassName}`}>
		<div
			className={`${styles.column} ${styles[state]}`}
			style={{ height: 320 * elevation * 0.01 || 1 }}
		/>
		<p className={`text text_type_column text_color_input mt-3`}>{elevation}</p>
	</div>
);
