import { ArrayItem, FrameMaker } from '../../shared/helpers/entities';
import { getRandomInteger } from '../../shared/helpers/utils';
import { ElementStates } from '../../shared/types';

export const SORT_METHOD = {
	SELECTION: 'selection',
	BUBBLE: 'bubble',
	INSERTION: 'insertion'
} as const;

export const SORT_TYPE = {
	NON_DECREASING: 'non-decreasing',
	NON_INCREASIGN: 'non-increasing'
} as const;

export type TSortMethodUnion = (typeof SORT_METHOD)[keyof typeof SORT_METHOD];

export type TSortTypeUnion = (typeof SORT_TYPE)[keyof typeof SORT_TYPE];

export class ArraySorter extends FrameMaker<ArrayItem<number>> {
	private _array: ArrayItem<number>[] = [];

	protected _frame() {
		this.onFrame([...this._array]);
	}

	private _prepareArray(array: ArrayItem<number>[]) {
		this._array = array;

		this._setItemState(
			this._array.map((_, idx) => idx),
			ElementStates.Default
		);
	}

	private _getComparator(type: TSortTypeUnion) {
		return type === SORT_TYPE.NON_DECREASING
			? (a: number, b: number) => a > b
			: (a: number, b: number) => a < b;
	}

	private _swap(idxA: number, idxB: number) {
		[this._array[idxA], this._array[idxB]] = [
			this._array[idxB],
			this._array[idxA]
		];
		return this._array;
	}

	private _setItemState(idxList: number[], state: ElementStates) {
		idxList.forEach((idx) => {
			this._array[idx] = {
				...this._array[idx],
				state
			};
		});
	}

	public selection(array: ArrayItem<number>[], type: TSortTypeUnion) {
		if (array.length < 2) {
			return array;
		}

		this._prepareArray(array);

		const comparator = this._getComparator(type);

		const { length } = this._array;

		for (let i = 0; i < length - 1; i += 1) {
			let swapIdx = i;

			this._setItemState([i], ElementStates.Changing);
			this._frame();

			for (let j = i + 1; j < length; j += 1) {
				const a = this._array[swapIdx].value;
				const b = this._array[j].value;

				this._setItemState([swapIdx, j], ElementStates.Changing);
				this._frame();

				if (comparator(a, b)) {
					this._setItemState([swapIdx], ElementStates.Default);
					this._frame();
					swapIdx = j;
				} else {
					this._setItemState([j], ElementStates.Default);
				}
			}

			if (swapIdx !== i) {
				this._swap(i, swapIdx);
			}

			this._setItemState([i], ElementStates.Modified);
			this._frame();
		}

		this._setItemState([length - 1], ElementStates.Modified);
		this._frame();

		return this._array;
	}

	public bubble(array: ArrayItem<number>[], type: TSortTypeUnion) {
		if (array.length < 2) {
			return array;
		}

		this._prepareArray(array);

		const comparator = this._getComparator(type);

		const { length } = this._array;

		for (let i = 0; i < length; i += 1) {
			let swapped = false;

			for (let j = 0; j < length - i - 1; j += 1) {
				const leftIdx = j;
				const rightIdx = j + 1;

				this._setItemState([leftIdx, rightIdx], ElementStates.Changing);
				this._frame();

				const a = this._array[leftIdx].value;
				const b = this._array[rightIdx].value;

				if (comparator(a, b)) {
					this._swap(leftIdx, rightIdx);
					swapped = true;
				}

				this._setItemState([leftIdx, rightIdx], ElementStates.Default);
				this._frame();
			}

			if (!swapped) break;

			this._setItemState([length - 1 - i], ElementStates.Modified);
		}

		this._setItemState(
			this._array.map((_, idx) => idx),
			ElementStates.Modified
		);
		this._frame();

		return this._array;
	}

	public insertion(array: ArrayItem<number>[], type: TSortTypeUnion) {
		if (array.length < 2) {
			return array;
		}

		this._prepareArray(array);

		const comparator = this._getComparator(type);

		const { length } = this._array;

		for (let i = 1; i < length; i += 1) {
			const item = this._array[i];
			let j = i;
			this._setItemState([j], ElementStates.Changing);
			this._frame();

			while (j > 0 && comparator(this._array[j - 1].value, item.value)) {
				this._array[j].value = this._array[j - 1].value;
				this._setItemState([j], ElementStates.Default);
				this._setItemState([j - 1], ElementStates.Changing);
				this._frame();

				j -= 1;
			}

			if (j !== i) {
				this._array[j].value = item.value;
			}

			this._setItemState([j], ElementStates.Modified);
			this._frame();
			this._setItemState([j], ElementStates.Default);
			this._frame();
		}

		this._setItemState(
			this._array.map((_, idx) => idx),
			ElementStates.Modified
		);
		this._frame();

		return this._array;
	}
}

export function makeArray() {
	const makeItem = () => new ArrayItem(getRandomInteger(0, 100));

	return new Array(getRandomInteger(3, 17)).fill(null).map(makeItem);
}
