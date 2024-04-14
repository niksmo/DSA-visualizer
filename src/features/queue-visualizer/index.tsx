import { useEffect, useReducer } from 'react';
import { QueueChart } from './chart';
import { QueueManager } from './manager';
import {
  changeValueAction,
  renderAction,
  queueReducer,
  queueVisualizerState,
  useQueue,
  animateAction,
  generateQueueAnimation
} from './utils';
import styles from './styles.module.css';

export const QueueVisualizer = () => {
  const queue = useQueue();
  const [{ inputValue, animation, renderElements }, dispatch] = useReducer(
    queueReducer,
    queueVisualizerState
  );

  const handleOnChangeInputValue = (evt: React.FormEvent<HTMLInputElement>) => {
    const currentValue = evt.currentTarget.value;
    dispatch(changeValueAction(currentValue));
  };

  const handleAdd = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!inputValue.trim()) {
      dispatch(changeValueAction(''));
      return;
    }
    queue.enqueue(inputValue.trim());
    dispatch(changeValueAction(''));

    const animationGenerator = generateQueueAnimation(
      renderElements,
      queue.tail
    );
    for await (const elements of animationGenerator) {
      dispatch(animateAction(elements, 'add'));
    }
    dispatch(renderAction(queue.getArray()));
  };

  const handleDelete = async () => {
    const animationGenerator = generateQueueAnimation(
      renderElements,
      queue.head
    );
    for await (const elements of animationGenerator) {
      dispatch(animateAction(elements, 'delete'));
    }
    queue.dequeue();
    dispatch(renderAction(queue.getArray()));
  };

  const handleClear = () => {
    queue.clear();
    dispatch(renderAction(queue.getArray()));
  };

  useEffect(() => {
    dispatch(renderAction(queue.getArray()));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <QueueManager
        value={inputValue}
        queueLength={queue.length}
        queueMaxSize={queue.maxSize}
        animation={animation}
        onAdd={handleAdd}
        onChange={handleOnChangeInputValue}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      <QueueChart
        elements={renderElements}
        extClassName={styles.queue__chart}
      />
    </div>
  );
};
