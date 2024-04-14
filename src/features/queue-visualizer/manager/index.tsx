import React from 'react';
import { clsx } from 'clsx';
import { TActionTypes } from '../utils';
import { Input } from '../../../shared/ui/input';
import { Button } from '../../../shared/ui/button';
import styles from './styles.module.css';

interface IQueueManagerProps {
  value: string;
  queueLength: number;
  queueMaxSize: number;
  animation: TActionTypes;
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onAdd: (evt: React.FormEvent) => void;
  onDelete: () => void;
  onClear: () => void;
  extClassName?: string;
}

export const QueueManager: React.FC<IQueueManagerProps> = ({
  value,
  queueLength,
  queueMaxSize,
  animation,
  onChange,
  onAdd,
  onDelete,
  onClear,
  extClassName
}) => (
  <form className={clsx(styles.controls, extClassName)} onSubmit={onAdd}>
    <Input
      placeholder="Введите значение"
      value={value}
      maxLength={4}
      isLimitText
      extClassName={styles.controls__input}
      onChange={onChange}
      disabled={queueLength === queueMaxSize}
    />
    <Button
      type="submit"
      text="Добавить"
      extClassName="ml-6"
      isLoader={animation === 'add'}
      disabled={!value || queueLength === queueMaxSize}
    />
    <Button
      data-testid="remove"
      text="Удалить"
      extClassName="ml-6"
      isLoader={animation === 'delete'}
      disabled={queueLength === 0}
      onClick={onDelete}
    />
    <Button
      data-testid="clear"
      text="Очистить"
      extClassName="ml-40"
      disabled={queueLength === 0}
      onClick={onClear}
    />
  </form>
);
