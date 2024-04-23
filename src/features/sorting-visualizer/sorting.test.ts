import { describe, it, expect } from 'vitest';
import { ArrayItem } from '../../shared/helpers/entities';
import { ArraySorter, SORT_TYPE } from './lib';

describe('sort array', () => {
	const sorter = new ArraySorter();

	describe('with bubble method', () => {
		it('should correctly sort empty array', async () => {
			const array: number[] = [];

			const items = array.map((v) => new ArrayItem(v));

			sorter.bubble(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([]);

			sorter.bubble(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([]);
		});

		it('should correctly sort array with one element', async () => {
			const array = [3];

			const items = array.map((v) => new ArrayItem(v));

			sorter.bubble(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([3]);

			sorter.bubble(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([3]);
		});

		it('should correctly sort array with several elements', async () => {
			const array = [3, 1, 7, 4];

			const items = array.map((v) => new ArrayItem(v));

			sorter.bubble(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([1, 3, 4, 7]);

			sorter.bubble(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([7, 4, 3, 1]);
		});
	});

	describe('with selection method', () => {
		it('should correctly sort empty array', () => {
			const array: number[] = [];

			const items = array.map((v) => new ArrayItem(v));

			sorter.selection(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([]);

			sorter.selection(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([]);
		});

		it('should correctly sort array with one element', () => {
			const array = [3];

			const items = array.map((v) => new ArrayItem(v));

			sorter.selection(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([3]);

			sorter.selection(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([3]);
		});

		it('should correctly sort array with several elements', () => {
			const array = [3, 1, 7, 4];

			const items = array.map((v) => new ArrayItem(v));

			sorter.selection(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([1, 3, 4, 7]);

			sorter.selection(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([7, 4, 3, 1]);
		});
	});

	describe('with insertion method', () => {
		it('should correctly sort empty array', async () => {
			const array: number[] = [];

			const items = array.map((v) => new ArrayItem(v));

			sorter.insertion(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([]);

			sorter.insertion(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([]);
		});

		it('should correctly sort array with one element', async () => {
			const array = [3];

			const items = array.map((v) => new ArrayItem(v));

			sorter.insertion(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([3]);

			sorter.insertion(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([3]);
		});

		it('should correctly sort array with several elements', async () => {
			const array = [3, 1, 7, 4];

			const items = array.map((v) => new ArrayItem(v));

			sorter.insertion(items, SORT_TYPE.NON_DECREASING);

			let sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([1, 3, 4, 7]);

			sorter.insertion(items, SORT_TYPE.NON_INCREASIGN);

			sortedArray = items.map((item) => item.value);

			expect(sortedArray).toEqual([7, 4, 3, 1]);
		});
	});
});
