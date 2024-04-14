import React from 'react';
import { clsx } from 'clsx';
import { TArrayItem } from '../../../shared/types';
import { Column } from '../../../shared/ui/column';
import styles from './styles.module.css';

interface ISortingChartProps {
  elements: TArrayItem[];
  extClassName?: string;
}

export const SortingChart: React.FC<ISortingChartProps> = ({
  elements,
  extClassName
}) => (
  <div className={clsx(styles.sortingChart, extClassName)}>
    {elements.map(item => (
      <Column
        key={item.id}
        elevation={item.value}
        state={item.state}
        extClassName={clsx(styles.sortingChart__scale, 'mr-5')}
      />
    ))}
  </div>
);
