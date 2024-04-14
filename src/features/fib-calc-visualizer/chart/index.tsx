import React from 'react';
import { clsx } from 'clsx';
import { TArrayItem } from '../../../shared/types';
import { Circle } from '../../../shared/ui/circle';
import styles from './styles.module.css';

interface IFibChartProps {
  elements: TArrayItem[];
  extClassName?: string;
}

export const FibChart: React.FC<IFibChartProps> = ({
  elements,
  extClassName
}) => (
  <div className={clsx(styles.chart, extClassName)}>
    {elements.map((item, index) => (
      <Circle
        letter={String(item.value)}
        index={index}
        key={item.id}
        extraClass={clsx(styles.chart__element, 'mr-8')}
      />
    ))}
  </div>
);
