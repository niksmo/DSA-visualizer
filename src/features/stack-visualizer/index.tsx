import { useEffect, useRef, useState } from 'react';
import { Chart } from './chart';
import { Manager } from './manager';
import type { ArrayItem } from '../../shared/helpers/entities';
import { Stack } from './lib';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
import styles from './styles.module.css';

const MAX_STACK_SIZE = 9;

export const StackVisualizer = () => {
	const [disableOptions, setDisableOptions] = useState({
		push: false,
		pop: true,
		clear: true
	});

	const [loadOptions, setLoadOptions] = useState({ push: false, pop: false });

	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [frames, setFrames] = useState<ArrayItem<string>[][]>([]);
	const stackRef = useRef(new Stack(MAX_STACK_SIZE));

	const renderElements = frames[currentFrame];
	const stack = stackRef.current;

	const handlePush = (value: string) => {
		const renderFrames: ArrayItem<string>[][] = [];
		stack.onFrame = (array) => renderFrames.push(array);
		stack.push(value);

		if (!renderFrames.length) return;

		setFrame(0);
		setFrames(renderFrames);
		setLoadOptions({ ...loadOptions, push: true });
		setAnimation(true);
	};

	const handlePop = () => {
		const renderFrames: ArrayItem<string>[][] = [];
		stack.onFrame = (array) => renderFrames.push(array);
		stack.pop();

		if (!renderFrames.length) return;

		setFrame(0);
		setFrames(renderFrames);
		setLoadOptions({ ...loadOptions, pop: true });
		setAnimation(true);
	};

	const handleClear = () => {
		stack.clear();

		setFrame(0);
		setFrames([]);
	};

	useEffect(() => {
		let timeoutId = -1;
		if (animation && currentFrame < frames.length - 1) {
			timeoutId = window.setTimeout(() => {
				setFrame(currentFrame + 1);
			}, DELAY_1000_MS);
		} else {
			const disableOpt = { ...disableOptions };
			disableOpt.push = stack.size === stack.maxSize;
			disableOpt.pop = disableOpt.clear = stack.size === 0;
			setDisableOptions(disableOpt);

			setAnimation(false);

			setLoadOptions({ push: false, pop: false });
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [
		animation,
		currentFrame,
		frames.length,
		disableOptions,
		stack.size,
		stack.maxSize
	]);

	return (
		<div>
			<Manager
				onPush={handlePush}
				onPop={handlePop}
				onClear={handleClear}
				disableOptions={disableOptions}
				loadOptions={loadOptions}
			/>
			{renderElements && (
				<Chart elements={renderElements} extClassName={styles.chart} />
			)}
		</div>
	);
};
