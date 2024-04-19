import { ArrayItem, FrameMaker } from '../../shared/helpers/entities';
import { ElementStates } from '../../shared/types';

export const enum SortType {
	NonDecreasing,
	NonIncreasing
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

	private _setItemState(idx: number, state: ElementStates) {
		this._array[idx] = {
			...this._array[idx],
			state
		};
	}

	public selectionSort(array: ArrayItem<number>[], type: SortType) {
		this._checkOnLength(array);

		this._array = array;

		const comparator = this._getComparator(type);

		const { length } = this._array;

		for (let i = 0; i < length - 1; i += 1) {
			let swapIdx = i;

			for (let j = i + 1; j < length; j += 1) {
				const a = this._array[swapIdx].value;
				const b = this._array[j].value;

				if (comparator(a, b)) {
					swapIdx = j;
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
				const a = this._array[j].value;
				const b = this._array[j + 1].value;

				if (comparator(a, b)) {
					this._swap(j, j + 1);
					swapped = true;
				}

				if (!swapped) break;
			}
		}

		return this._array;
	}
}
