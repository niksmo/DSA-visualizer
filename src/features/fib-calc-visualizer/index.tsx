import React, { useEffect, useReducer, useRef } from 'react';
import { clsx } from 'clsx';
import { FibChart } from './chart';
import { FibManager } from './manager';
import {
	animateAction,
	changeValueAction,
	fibCalcInitState,
	fibCalcReducer,
	generateFibAnimation,
	stopAction
} from './utils';
import styles from './styles.module.css';
import { DELAY_500_MS } from '../../shared/helpers/delays';
import { withMessage } from '../../shared/helpers/utils';

interface IFibCalcVisualizerProps {
	extClassName?: string;
}

export const FibCalcVisualizer: React.FC<IFibCalcVisualizerProps> = ({
	extClassName
}) => {
	const [{ animation, inputValue, renderElements }, dispatch] = useReducer(
		fibCalcReducer,
		fibCalcInitState
	);

	const abortControllerRef = useRef<null | AbortController>(null);

	const abortAnimation = () => {
		dispatch(stopAction());
		abortControllerRef.current?.abort();
	};

	const handleOnChange = (evt: React.FormEvent<HTMLInputElement>) => {
		const currentValue = evt.currentTarget.value;

		const allowedNum = /^[1-9]$|^1\d$|^\s*$/;
		if (allowedNum.test(currentValue)) {
			dispatch(changeValueAction(currentValue));
		}
	};

	const handleCalcFibNum = async (evt: React.FormEvent) => {
		evt.preventDefault();

		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		const animationGenerator = generateFibAnimation(
			Number(inputValue),
			DELAY_500_MS,
			abortController
		);
		try {
			for await (const elements of animationGenerator) {
				dispatch(animateAction(elements));
			}
			dispatch(stopAction());
		} catch (error) {
			if (withMessage(error)) {
				console.log(error.message);
			}
		}
	};

	useEffect(() => () => void abortAnimation(), []);

	return (
		<div className={clsx(styles.fibVisualizer, extClassName)}>
			<FibManager
				onSubmit={handleCalcFibNum}
				onChange={handleOnChange}
				value={inputValue}
				isDisabled={animation}
			/>
			<FibChart
				extClassName={styles.fibVisualizer__chart}
				elements={renderElements}
			/>
		</div>
	);
};
