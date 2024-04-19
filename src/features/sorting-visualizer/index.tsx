import { useEffect, useState } from 'react';
import { SortingChart } from './chart';
import { SortManager, TSortMethodUnion, TSortTypeUnion } from './manager';
import { DELAY_500_MS } from '../../shared/helpers/delays';
import { ArrayItem } from '../../shared/helpers/entities';
import { makeArray } from './lib';

interface IProps {
	extClassName?: string;
}

const initArray = makeArray();

export function SortingVisualizer({ extClassName }: IProps) {
	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const [frames, setFrames] = useState<ArrayItem<number>[][]>([initArray]);

	const renderElements = frames[currentFrame];

	const handleMethodChange = (sortMethod: TSortMethodUnion) => {};

	const handleSort = (sortType: TSortTypeUnion) => {};

	const handleNewArray = () => {
		setFrames([makeArray()]);
		setFrame(0);
	};

	useEffect(() => {
		let timeoutId = -1;

		return () => {
			clearTimeout(timeoutId);
		};
	});

	return (
		<div className={extClassName}>
			<SortManager
				disabled={animation}
				onMethodChange={handleMethodChange}
				onSort={handleSort}
				onNewArray={handleNewArray}
			/>
			<SortingChart elements={renderElements} extClassName="mt-25" />
		</div>
	);
}
