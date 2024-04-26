import { useEffect, useRef, useState } from 'react';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
import type { RenderItem } from '../../shared/helpers/entities';
import { Chart } from './chart';
import { LoadEnum, Manager } from './manager';
import { Stack } from './lib';
import styles from './styles.module.css';

const MAX_STACK_SIZE = 9;

export const StackVisualizer = () => {
	const [disableOptions, setDisableOptions] = useState({
		push: false,
		pop: false
	});

	const [load, setLoad] = useState<LoadEnum | false>(false);

	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [frames, setFrames] = useState<RenderItem<string>[][]>([]);
	const stackRef = useRef(new Stack(MAX_STACK_SIZE));
	const stack = stackRef.current;
	const renderElements = frames[currentFrame];

	function startAnimation(fn: () => void, load: LoadEnum) {
		const animationFrames: RenderItem<string>[][] = [];
		stack.onFrame = (frame) => animationFrames.push(frame);
		fn();
		setFrames(animationFrames);
		setFrame(0);
		setLoad(load);
		setAnimation(true);
	}

	const handlePush = (value: string) => {
		startAnimation(() => stack.push(value), LoadEnum.push);
	};

	const handlePop = () => {
		startAnimation(() => stack.pop(), LoadEnum.pop);
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
			setAnimation(false);
			setLoad(false);
			setDisableOptions({
				push: stack.size === stack.maxSize,
				pop: stack.size === 0
			});
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [animation, currentFrame, frames.length]);

	return (
		<div>
			<Manager
				onPush={handlePush}
				onPop={handlePop}
				onClear={handleClear}
				disableOptions={disableOptions}
				load={load}
			/>
			{renderElements && (
				<Chart elements={renderElements} extClassName={styles.chart} />
			)}
		</div>
	);
};
