import React from 'react';
import { clsx } from 'clsx';
import { ElementStates, TArrayItem } from '../../../shared/types';
import { Circle } from '../../../shared/ui/circle';
import { ArrowIcon } from '../../../shared/ui/icons';
import styles from './styles.module.css';

interface ILinkedListChartProps {
  elements: TArrayItem<string>[];
  extClassName?: string;
}

export const LinkedListChart: React.FC<ILinkedListChartProps> = ({
  elements,
  extClassName
}) => {
  const getHead = (headValue: string | null) => {
    if (headValue === 'head') {
      return headValue;
    }

    if (headValue) {
      return (
        <Circle isSmall letter={headValue} state={ElementStates.Changing} />
      );
    }

    return headValue;
  };

  const getTail = (tailValue: string | null) => {
    if (tailValue === 'tail') {
      return tailValue;
    }

    if (tailValue) {
      return (
        <Circle isSmall letter={tailValue} state={ElementStates.Changing} />
      );
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
            extraClass={clsx(styles.chart__element, 'ml-8 mr-8')}
          />
          {index !== array.length - 1 && (
            <ArrowIcon
              fill={
                item.passed ? ElementStates.Changing : ElementStates.Default
              }
            />
          )}
        </li>
      ))}
    </ul>
  );
};
