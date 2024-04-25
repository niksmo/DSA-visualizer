import { useEffect, useRef, useState } from 'react';
import { Chart } from './chart';
import { LoadEnum, Manager } from './manager';
import { Deque, type RenderNode } from './lib';
import { getRandomInteger } from '../../shared/helpers/utils';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
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

	const handlePushFront = (value: string) => {
		const animationFrames: RenderNode[][] = [];
		deque.onFrame = (frame) => animationFrames.push(frame);
		deque.pushFront(value);
		setFrames(animationFrames);
		setFrame(0);
		setLoad(LoadEnum.pushFront);
		setAnimation(true);
	};

	const handlePopFront = () => {
		const animationFrames: RenderNode[][] = [];
		deque.onFrame = (frame) => animationFrames.push(frame);
		deque.popFront();
		setFrames(animationFrames);
		setFrame(0);
		setLoad(LoadEnum.popFront);
		setAnimation(true);
	};

	const handlePushBack = (value: string) => {
		const animationFrames: RenderNode[][] = [];
		deque.onFrame = (frame) => animationFrames.push(frame);
		deque.pushBack(value);
		setFrames(animationFrames);
		setFrame(0);
		setLoad(LoadEnum.pushBack);
		setAnimation(true);
	};

	const handlePopBack = () => {
		const animationFrames: RenderNode[][] = [];
		deque.onFrame = (frame) => animationFrames.push(frame);
		deque.popBack();
		setFrames(animationFrames);
		setFrame(0);
		setLoad(LoadEnum.popBack);
		setAnimation(true);
	};

	const handleInsert = (idx: number, value: string) => {
		const animationFrames: RenderNode[][] = [];
		deque.onFrame = (frame) => animationFrames.push(frame);
		deque.insert(idx, value);
		setFrames(animationFrames);
		setFrame(0);
		setLoad(LoadEnum.insert);
		setAnimation(true);
	};

	const handleDelete = (idx: number) => {
		const animationFrames: RenderNode[][] = [];
		deque.onFrame = (frame) => animationFrames.push(frame);
		deque.delete(idx);
		setFrames(animationFrames);
		setFrame(0);
		setLoad(LoadEnum.delete);
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
