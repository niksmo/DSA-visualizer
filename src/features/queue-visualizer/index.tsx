import { useEffect, useRef, useState } from 'react';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
import type { RenderItem } from '../../shared/helpers/entities';
import { Chart } from './chart';
import { LoadEnum, Manager } from './manager';
import { Queue } from './lib';
import styles from './styles.module.css';

const MAX_QUEUE_SIZE = 7;

export function QueueVisualizer() {
	const [disableOptions, setDisableOptions] = useState({
		enqueue: false,
		dequeue: false
	});

	const [load, setLoad] = useState<LoadEnum | false>(false);

	const queueRef = useRef(new Queue(MAX_QUEUE_SIZE));
	const queue = queueRef.current;
	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [frames, setFrames] = useState<RenderItem<string>[][]>([queue.items]);

	const renderElements = frames[currentFrame];

	function startAnimation(fn: () => void, load: LoadEnum) {
		const renderFrames: RenderItem<string>[][] = [];
		queue.onFrame = (array) => renderFrames.push(array);
		fn();

		setFrame(0);
		setFrames(renderFrames);
		setLoad(load);
		setAnimation(true);
	}

	const handleEnqueue = (value: string) => {
		startAnimation(() => queue.enqueue(value), LoadEnum.enqueue);
	};

	const handleDequeue = () => {
		startAnimation(() => queue.dequeue(), LoadEnum.dequeue);
	};

	const handleClear = () => {
		queue.clear();
		setFrame(0);
		setFrames([queue.items]);
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
				enqueue: queue.size === queue.maxSize,
				dequeue: queue.size === 0
			});
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [animation, currentFrame, frames.length]);

	return (
		<div>
			<Manager
				onEnqueue={handleEnqueue}
				onDequeue={handleDequeue}
				onClear={handleClear}
				disableOptions={disableOptions}
				load={load}
			/>
			{renderElements && (
				<Chart elements={renderElements} extClassName={styles.chart} />
			)}
		</div>
	);
}
