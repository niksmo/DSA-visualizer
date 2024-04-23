import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Chart } from './chart';
import { Manager } from './manager';
import { DELAY_500_MS } from '../../shared/helpers/delays';
import type { ArrayItem } from '../../shared/helpers/entities';
import { FibCalculator } from './lib';
import styles from './styles.module.css';

interface IProps {
	extClassName?: string;
}

export function FibCalcVisualizer({ extClassName }: IProps) {
	const [animation, setAnimation] = useState(false);
	const [currentFrame, setFrame] = useState(0);
	const [frames, setFrames] = useState<ArrayItem<number>[][]>([]);

	const renderElements = frames[currentFrame];

	const handleComputeFibNum = (numValue: string) => {
		console.log(numValue);
		const renderFrames: ArrayItem<number>[][] = [];

		const fibCalc = new FibCalculator();
		fibCalc.onFrame = (array) => renderFrames.push(array);
		fibCalc.compute(parseInt(numValue));

		if (renderFrames.length === 0) return;

		setFrame(0);
		setFrames(renderFrames);
		setAnimation(true);
	};

	useEffect(() => {
		let timeoutId = -1;
		if (animation && currentFrame < frames.length - 1) {
			timeoutId = window.setTimeout(() => {
				setFrame(currentFrame + 1);
			}, DELAY_500_MS);
		} else {
			setAnimation(false);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [currentFrame, animation, frames]);

	return (
		<div className={clsx(styles.fibVisualizer, extClassName)}>
			<Manager onSubmit={handleComputeFibNum} disabled={animation} />

			{renderElements && (
				<Chart
					extClassName={styles.fibVisualizer__chart}
					elements={renderElements}
				/>
			)}
		</div>
	);
}
