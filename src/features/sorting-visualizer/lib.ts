import { ArrayItem, FrameMaker } from '../../shared/helpers/entities';
import { getRandomInteger } from '../../shared/helpers/utils';
import { ElementStates } from '../../shared/types';

export const enum SortType {
	NonDecreasing = 'non-decreasing',
	NonIncreasing = 'non-increasing'
}

export class ArraySorter extends FrameMaker<ArrayItem<number>> {
	private _array: ArrayItem<number>[] = [];

	protected _frame() {
		this.onFrame([...this._array]);
	}

	private _checkOnLength(array: ArrayItem<number>[]) {
		if (array.length < 2) {
			return array;
		}
	}

	private _getComparator(type: SortType) {
		return type === SortType.NonDecreasing
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

	public selectionSort(array: ArrayItem<number>[], type: SortType) {
		this._checkOnLength(array);

		this._array = array;

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
		}

		return this._array;
	}

	public bubbleSort(array: ArrayItem<number>[], type: SortType) {
		this._checkOnLength(array);

		this._array = array;

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

				if (!swapped) break;
			}

			this._setItemState([length - i - 1], ElementStates.Modified);
			this._frame();
		}

		return this._array;
	}

	public insertionSort(array: ArrayItem<number>[], type: SortType) {
		this._checkOnLength(array);

		this._array = array;

		const comparator = this._getComparator(type);

		const { length } = this._array;

		for (let i = 1; i < length; i += 1) {
			const item = this._array[i];
			let j = i;
			while (j > 0 && comparator(this._array[j - 1].value, item.value)) {
				this._array[j] = this._array[j - 1];
				j -= 1;
			}

			if (j !== i) {
				this._array[j] = item;
			}
		}
	}
}

export function makeArray() {
	const makeItem = () => new ArrayItem(getRandomInteger(0, 100));

	return new Array(getRandomInteger(3, 17)).fill(null).map(makeItem);
}
