import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { DELAY_500_MS } from '../../shared/helpers/delays';
import type { RenderItem } from '../../shared/helpers/entities';
import { Chart } from './chart';
import { Manager } from './manager';
import { FibCalculator } from './lib';
import styles from './styles.module.css';

interface IProps {
	extClassName?: string;
}

export function FibCalcVisualizer({ extClassName }: IProps) {
	const [animation, setAnimation] = useState(false);
	const [currentFrame, setFrame] = useState(0);
	const [frames, setFrames] = useState<RenderItem<number>[][]>([]);

	const renderElements = frames[currentFrame];

	const handleComputeFibNum = (numValue: string) => {
		const renderFrames: RenderItem<number>[][] = [];

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
	}, [currentFrame, animation, frames.length]);

	return (
		<div className={clsx(styles.fibVisualizer, extClassName)}>
			<Manager onSubmit={handleComputeFibNum} disabled={animation} />

			{renderElements && (
				<Chart elements={renderElements} extClassName={styles.chart} />
			)}
		</div>
	);
}
