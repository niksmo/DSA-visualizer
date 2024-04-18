import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
import { ArrayItem } from '../../shared/helpers/entities';
import { ReverseManager } from './manager';
import { ReverseChart } from './chart';
import { StringReverser } from './lib';
import styles from './styles.module.css';

interface IProps {
	extClassName?: string;
}

export function ReverseVisualizer({ extClassName }: IProps) {
	const [stringValue, setStringValue] = useState('');
	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const frames = useRef<ArrayItem<string>[][]>([]);

	const renderElements = frames.current[currentFrame];
	const haveFrames = frames.current.length !== 0;

	const handleOnChangeInputValue = (evt: React.FormEvent<HTMLInputElement>) => {
		setStringValue(evt.currentTarget.value);
	};

	const handleReverseString = (evt: React.FormEvent) => {
		evt.preventDefault();

		const trimmedValue = stringValue.trim();

		if (trimmedValue) return;

		frames.current = [];

		const reverser = new StringReverser();

		reverser.onFrame = (array) => frames.current.push(array);
		reverser.reverse(trimmedValue);

		if (frames.current.length === 0) return;

		setFrame(0);
		setAnimation(true);
	};

	useEffect(() => {
		let timeoutId = -1;
		if (animation && currentFrame < frames.current.length - 1) {
			timeoutId = window.setTimeout(() => {
				setFrame(currentFrame + 1);
			}, DELAY_1000_MS);
		} else {
			setAnimation(false);
		}
		return () => {
			clearTimeout(timeoutId);
		};
	}, [animation, currentFrame]);

	return (
		<div className={clsx(styles.reverseVisualizer, extClassName)}>
			<ReverseManager
				value={stringValue}
				onChange={handleOnChangeInputValue}
				isDisabled={animation}
				onSubmit={handleReverseString}
			/>
			{haveFrames && (
				<ReverseChart
					elements={renderElements}
					extClassName={styles.reverseVisualizer__chart}
				/>
			)}
		</div>
	);
}
