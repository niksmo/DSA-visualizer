import React from 'react';
import { TArrayItem } from '../../shared/types';
import { DELAY_500_MS } from '../../shared/helpers/delays';
import { waitWithDelay } from '../../shared/helpers/utils';
import { ArrayItem } from '../../shared/helpers/entities';

export const changeValueAction = (payload: string) => ({
	type: 'changeValue' as const,
	payload
});

export const animateAction = (payload: TArrayItem[]) => ({
	type: 'animate' as const,
	payload
});

export const stopAction = () => ({
	type: 'stop' as const
});

type TFibCalcActionTypes =
	| ReturnType<typeof animateAction>
	| ReturnType<typeof stopAction>
	| ReturnType<typeof changeValueAction>;

interface IFibCalcState {
	animation: boolean;
	inputValue: string;
	renderElements: TArrayItem[];
}

export const fibCalcInitState: IFibCalcState = {
	animation: false,
	inputValue: '',
	renderElements: []
};

export const fibCalcReducer: React.Reducer<
	IFibCalcState,
	TFibCalcActionTypes
> = (prevState, action): IFibCalcState => {
	switch (action.type) {
		case 'changeValue':
			return { ...prevState, inputValue: action.payload };
		case 'animate':
			return { ...prevState, animation: true, renderElements: action.payload };
		case 'stop':
			return { ...prevState, animation: false };
	}
};

export async function* generateFibAnimation(
	num: number,
	latency = DELAY_500_MS,
	abortController?: AbortController
) {
	const ans: TArrayItem[] = [];
	const delay = waitWithDelay(latency, abortController);

	let a = 0;
	let b = 1;
	let c;
	try {
		ans.push(new ArrayItem(1));
		yield ans;
		await delay();

		for (let i = 0; i < num; i++) {
			c = a + b;

			ans.push(new ArrayItem(c));
			yield ans;
			await delay();

			a = b;
			b = c;
		}

		return ans;
	} catch {
		throw new Error('animation aborted');
	}
}
