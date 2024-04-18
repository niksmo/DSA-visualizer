import { describe, it, expect } from 'vitest';
import { ArrayItem } from '../../shared/helpers/entities';
import { ElementStates } from '../../shared/types';
import { StringReverser } from './lib';

describe('reverse string', () => {
	it('should correctly reverse string with even count of substrings', () => {
		const reverser = new StringReverser(() => {});
		const result = reverser
			.reverse('1234')
			.map((item) => item.value)
			.join('');

		expect(result).toEqual('4321');
	});

	it('should correctly reverse string with odd count of substrings', () => {
		const reverser = new StringReverser(() => {});
		const result = reverser
			.reverse('12345')
			.map((item) => item.value)
			.join('');

		expect(result).toEqual('54321');
	});

	it('should correctly reverse string with one substring', () => {
		const reverser = new StringReverser(() => {});
		const result = reverser
			.reverse('1')
			.map((item) => item.value)
			.join('');

		expect(result).toEqual('1');
	});

	it('should correctly reverse empty string', () => {
		const reverser = new StringReverser(() => {});
		const result = reverser
			.reverse('')
			.map((item) => item.value)
			.join('');

		expect(result).toEqual('');
	});

	it('should correctly changing items state', () => {
		const frames: Array<ArrayItem<string>[]> = [];
		const reverser = new StringReverser((array) => {
			frames.push(array);
		});
		reverser.reverse('12');

		expect(
			[frames[1][0].state, frames[1][1].state].every(
				(state) => state === ElementStates.Changing
			)
		).toBe(true);

		expect(
			[frames[2][0].state, frames[2][1].state].every(
				(state) => state === ElementStates.Modified
			)
		).toBe(true);
	});
});
