import { useEffect, useRef, useState } from 'react';
import { Chart } from './chart';
import { Manager } from './manager';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
import type { RenderItem } from '../../shared/helpers/entities';
import { Queue } from './lib';
import styles from './styles.module.css';

const MAX_QUEUE_SIZE = 7;

export function QueueVisualizer() {
	const [disableOptions, setDisableOptions] = useState({
		enqueue: false,
		dequeue: true,
		clear: true
	});

	const [loadOptions, setLoadOptions] = useState({
		enqueue: false,
		dequeue: false
	});

	const queueRef = useRef(new Queue(MAX_QUEUE_SIZE));
	const queue = queueRef.current;

	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [frames, setFrames] = useState<RenderItem<string>[][]>([queue.items]);

	const renderElements = frames[currentFrame];

	const handleEnqueue = (value: string) => {
		const renderFrames: RenderItem<string>[][] = [];
		queue.onFrame = (array) => renderFrames.push(array);
		queue.enqueue(value);

		if (!renderFrames.length) return;

		setFrame(0);
		setFrames(renderFrames);
		setLoadOptions({ ...loadOptions, enqueue: true });
		setAnimation(true);
	};

	const handleDequeue = () => {
		const renderFrames: RenderItem<string>[][] = [];
		queue.onFrame = (array) => renderFrames.push(array);
		queue.dequeue();

		if (!renderFrames.length) return;

		setFrame(0);
		setFrames(renderFrames);
		setLoadOptions({ ...loadOptions, dequeue: true });
		setAnimation(true);
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
			const disableOpt = { ...disableOptions };
			disableOpt.enqueue = queue.size === queue.maxSize;
			disableOpt.dequeue = disableOpt.clear = queue.size === 0;
			setDisableOptions(disableOpt);

			setAnimation(false);

			setLoadOptions({ enqueue: false, dequeue: false });
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
				loadOptions={loadOptions}
			/>
			{renderElements && (
				<Chart elements={renderElements} extClassName={styles.chart} />
			)}
		</div>
	);
}
