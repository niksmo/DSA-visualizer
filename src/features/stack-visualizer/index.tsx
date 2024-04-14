import React, { useReducer } from 'react';
import { StackChart } from './chart';
import { StackManager } from './manager';
import {
  animateAction,
  changeValueAction,
  generateStackAnimation,
  renderAction,
  stackReducer,
  stackVisualizerState,
  useStack
} from './utils';
import styles from './styles.module.css';

export const StackVisualizer = () => {
  const stack = useStack();
  const [{ inputValue, animation, renderElements }, dispatch] = useReducer(
    stackReducer,
    stackVisualizerState
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

    stack.push(inputValue.trim());
    dispatch(changeValueAction(''));
    const animationGenerator = generateStackAnimation(stack.getArray());
    for await (const elements of animationGenerator) {
      dispatch(animateAction(elements, 'add'));
    }
    dispatch(renderAction(stack.getArray()));
  };

  const handleDelete = async () => {
    const animationGenerator = generateStackAnimation(renderElements);
    for await (const elements of animationGenerator) {
      dispatch(animateAction(elements, 'delete'));
    }
    stack.pop();
    dispatch(renderAction(stack.getArray()));
  };

  const handleClear = () => {
    stack.clear();
    dispatch(renderAction(stack.getArray()));
  };

  return (
    <div>
      <StackManager
        value={inputValue}
        stackSize={stack.size}
        stackMaxSize={stack.maxSize}
        action={animation}
        onAdd={handleAdd}
        onChange={handleOnChangeInputValue}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      <StackChart
        elements={renderElements}
        extClassName={styles.stack__chart}
      />
    </div>
  );
};
