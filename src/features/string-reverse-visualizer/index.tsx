import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ReverseManager } from './manager';
import { ReverseChart } from './chart';
import { DELAY_1000_MS } from '../../shared/helpers/delays';
import styles from './styles.module.css';
import { StringReverser } from './lib';
import { ArrayItem } from '../../shared/helpers/entities';

interface IProps {
	extClassName?: string;
}

export function ReverseVisualizer({ extClassName }: IProps) {
	const [stringValue, setStringValue] = useState('');
	const [currentFrame, setFrame] = useState(0);
	const [animation, setAnimation] = useState(false);
	const frames = useRef<Array<ArrayItem<string>[]>>([]);
	const timeoutId = useRef<number>(-1);

	const handleOnChangeInputValue = (evt: React.FormEvent<HTMLInputElement>) => {
		setStringValue(evt.currentTarget.value);
	};

	const handleReverseString = async (evt: React.FormEvent) => {
		evt.preventDefault();

		if (!stringValue.trim()) {
			return;
		}

		frames.current = [];

		const reverser = new StringReverser((array) => frames.current.push(array));

		reverser.reverse(stringValue);

		if (frames.current.length === 0) return;

		setFrame(0);
		setAnimation(true);
	};

	useEffect(() => {
		if (animation && currentFrame < frames.current.length - 1) {
			timeoutId.current = window.setTimeout(() => {
				setFrame(currentFrame + 1);
			}, DELAY_1000_MS);
		} else {
			setAnimation(false);
		}
		return () => {
			clearTimeout(timeoutId.current);
		};
	}, [animation, currentFrame]);

	const renderElements = frames.current[currentFrame];

	return (
		<div className={clsx(styles.reverseVisualizer, extClassName)}>
			<ReverseManager
				value={stringValue}
				onChange={handleOnChangeInputValue}
				isDisabled={animation}
				onSubmit={handleReverseString}
			/>
			{frames.current.length !== 0 && (
				<ReverseChart
					elements={renderElements}
					extClassName={styles.reverseVisualizer__chart}
				/>
			)}
		</div>
	);
}
