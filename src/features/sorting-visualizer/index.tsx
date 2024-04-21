import { useEffect, useState } from 'react';
import { SortingChart } from './chart';
import { SortManager } from './manager';
import { DELAY_500_MS } from '../../shared/helpers/delays';
import { ArrayItem } from '../../shared/helpers/entities';
import {
	ArraySorter,
	TSortMethodUnion,
	TSortTypeUnion,
	makeArray
} from './lib';

interface IProps {
	extClassName?: string;
}

const initArray = makeArray();

export function SortingVisualizer({ extClassName }: IProps) {
	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [frames, setFrames] = useState<ArrayItem<number>[][]>([initArray]);

	const renderElements = frames[currentFrame];

	const handleSort = (
		sortMethod: TSortMethodUnion,
		sortType: TSortTypeUnion
	) => {
		const array = [...frames[frames.length - 1]];

		const sorter = new ArraySorter();

		const renderFrames: Array<ArrayItem<number>[]> = [];

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
	});

	return (
		<div className={extClassName}>
			<SortManager
				disabled={animation}
				onSort={handleSort}
				onNewArray={handleNewArray}
			/>
			<SortingChart elements={renderElements} extClassName="mt-25" />
		</div>
	);
}
