import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
import type { ArrayItem } from '../../shared/helpers/entities';
import { Manager } from './manager';
import { Chart } from './chart';
import { StringReverser } from './lib';
import styles from './styles.module.css';

interface IProps {
	extClassName?: string;
}

export function ReverseVisualizer({ extClassName }: IProps) {
	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [frames, setFrames] = useState<ArrayItem<string>[][]>([]);

	const renderElements = frames[currentFrame];

	const handleReverseString = (stringValue: string) => {
		const trimmedValue = stringValue.trim();

		if (!trimmedValue) return;

		const renderFrames: ArrayItem<string>[][] = [];

		const reverser = new StringReverser();

		reverser.onFrame = (array) => renderFrames.push(array);
		reverser.reverse(trimmedValue);

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
			}, DELAY_1000_MS);
		} else {
			setAnimation(false);
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [animation, currentFrame, frames]);

	return (
		<div className={clsx(styles.reverseVisualizer, extClassName)}>
			<Manager disabled={animation} onSubmit={handleReverseString} />
			{renderElements && (
				<Chart elements={renderElements} extClassName={styles.chart} />
			)}
		</div>
	);
}
