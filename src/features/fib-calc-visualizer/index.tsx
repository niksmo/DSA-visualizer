import React, { useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { FibChart } from './chart';
import { FibManager } from './manager';
import { DELAY_500_MS } from '../../shared/helpers/delays';
import styles from './styles.module.css';
import { ArrayItem } from '../../shared/helpers/entities';
import { FibCalculator } from './lib';

const NUM_PATTERN = /^[1-9]$|^1\d$|^\s*$/;

interface IProps {
	extClassName?: string;
}

export function FibCalcVisualizer({ extClassName }: IProps) {
	const [numValue, setNumValue] = useState('');
	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const frames = useRef<ArrayItem<number>[][]>([]);

	const renderElements = frames.current[currentFrame];
	const haveFrames = frames.current.length !== 0;

	const handleOnChange = (evt: React.FormEvent<HTMLInputElement>) => {
		const numValue = evt.currentTarget.value;

		NUM_PATTERN.test(numValue) && setNumValue(numValue);
	};

	const handleComputeFibNum = (evt: React.FormEvent) => {
		evt.preventDefault();

		frames.current = [];

		const fibCalc = new FibCalculator();
		fibCalc.onFrame = (array) => frames.current.push(array);
		fibCalc.compute(parseInt(numValue));

		if (frames.current.length === 0) return;

		setFrame(0);
		setAnimation(true);
	};

	useEffect(() => {
		let timeoutId = -1;
		if (animation && currentFrame < frames.current.length - 1) {
			timeoutId = window.setTimeout(() => {
				setFrame(currentFrame + 1);
			}, DELAY_500_MS);
		} else {
			setAnimation(false);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [currentFrame, animation]);

	return (
		<div className={clsx(styles.fibVisualizer, extClassName)}>
			<FibManager
				onSubmit={handleComputeFibNum}
				onChange={handleOnChange}
				value={numValue}
				isDisabled={animation}
			/>

			{haveFrames && (
				<FibChart
					extClassName={styles.fibVisualizer__chart}
					elements={renderElements}
				/>
			)}
		</div>
	);
}
