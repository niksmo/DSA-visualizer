import { useEffect, useState } from 'react';
import { DELAY_500_MS } from '../../shared/helpers/delays';
import type { RenderItem } from '../../shared/helpers/entities';
import { Chart } from './chart';
import { Manager } from './manager';
import {
	ArraySorter,
	type TSortMethodUnion,
	type TSortTypeUnion,
	makeArray
} from './lib';

interface IProps {
	extClassName?: string;
}

export function SortingVisualizer({ extClassName }: IProps) {
	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [frames, setFrames] = useState<RenderItem<number>[][]>([makeArray()]);

	const renderElements = frames[currentFrame];

	const handleSort = (
		sortMethod: TSortMethodUnion,
		sortType: TSortTypeUnion
	) => {
		const array = [...frames].pop();

		if (!array) return;

		const sorter = new ArraySorter();
		const renderFrames: RenderItem<number>[][] = [];
		sorter.onFrame = (frame) => renderFrames.push(frame);
		sorter[sortMethod](array, sortType);

		setFrame(0);
		setFrames(renderFrames);
		setAnimation(true);
	};

	const handleNewArray = () => {
		setFrames([makeArray()]);
		setFrame(0);
	};

	useEffect(() => {
		let timeoutId = -1;
		if (animation && currentFrame < frames.length - 1) {
			timeoutId = window.setTimeout(
				() => setFrame(currentFrame + 1),
				DELAY_500_MS
			);
		} else {
			setAnimation(false);
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [animation, currentFrame, frames.length]);

	return (
		<div className={extClassName}>
			<Manager
				disabled={animation}
				onSort={handleSort}
				onNewArray={handleNewArray}
			/>
			<Chart elements={renderElements} extClassName="mt-30" />
		</div>
	);
}
