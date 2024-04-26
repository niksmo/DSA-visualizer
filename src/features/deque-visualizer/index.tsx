import { useEffect, useRef, useState } from 'react';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
import { getRandomInteger } from '../../shared/helpers/utils';
import { Chart } from './chart';
import { LoadEnum, Manager } from './manager';
import { Deque, type RenderNode } from './lib';
import styles from './styles.module.css';

const MAX_SIZE = 7;
const INIT_LIST_SIZE = 5;
const MIN_RNDM_INT = 10;
const MAX_RNDM_INT = 90;

const INIT_LIST = Array(INIT_LIST_SIZE)
	.fill(null)
	.map(() => getRandomInteger(MIN_RNDM_INT, MAX_RNDM_INT));

export function DequeVisualizer() {
	const [disableOptions, setDisableOptions] = useState({
		push: false,
		pop: false
	});

	const [load, setLoad] = useState<LoadEnum | false>(false);

	const dequeRef = useRef(new Deque(MAX_SIZE, INIT_LIST));
	const deque = dequeRef.current;

	const [animation, setAnimation] = useState(false);
	const [currentFrame, setFrame] = useState(0);
	const [frames, setFrames] = useState([deque.items]);

	const renderElements = frames[currentFrame];

	function startAnimation(fn: () => void, load: LoadEnum) {
		const animationFrames: RenderNode[][] = [];
		deque.onFrame = (frame) => animationFrames.push(frame);
		fn();
		setFrames(animationFrames);
		setFrame(0);
		setLoad(load);
		setAnimation(true);
	}

	const handlePushFront = (value: string) => {
		startAnimation(() => deque.pushFront(value), LoadEnum.pushFront);
	};

	const handlePopFront = () => {
		startAnimation(() => deque.popFront(), LoadEnum.popFront);
	};

	const handlePushBack = (value: string) => {
		startAnimation(() => deque.pushBack(value), LoadEnum.pushBack);
	};

	const handlePopBack = () => {
		startAnimation(() => deque.popBack(), LoadEnum.popBack);
	};

	const handleInsert = (idx: number, value: string) => {
		startAnimation(() => deque.insert(idx, value), LoadEnum.insert);
	};

	const handleDelete = (idx: number) => {
		startAnimation(() => deque.delete(idx), LoadEnum.delete);
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
				push: deque.size === deque.maxSize,
				pop: deque.size === 0
			});
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [animation, currentFrame, frames.length]);

	return (
		<div>
			<Manager
				onPushFront={handlePushFront}
				onPopFront={handlePopFront}
				onPushBack={handlePushBack}
				onPopBack={handlePopBack}
				onInsert={handleInsert}
				onDelete={handleDelete}
				minIndex={0}
				maxIndex={deque.size - 1}
				disableOptions={disableOptions}
				load={load}
			/>
			<Chart elements={renderElements} extClassName={styles.linkedList__chart} />
		</div>
	);
}
