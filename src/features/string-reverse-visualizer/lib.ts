import {
	RenderItem,
	FrameMaker,
	ElementStates
} from '../../shared/helpers/entities';

export class StringReverser extends FrameMaker<RenderItem<string>> {
	private _array: RenderItem<string>[] = [];

	private _swap(idxA: number, idxB: number) {
		[this._array[idxA], this._array[idxB]] = [
			this._array[idxB],
			this._array[idxA]
		];
		return this._array;
	}

	private _setItemState(idx: number, state: ElementStates) {
		this._array[idx] = Object.assign({}, this._array[idx], { state });
	}

	protected _frame() {
		this.onFrame(this._array.map((item) => Object.assign({}, item)));
	}

	public reverse(str: string) {
		this._array = str.split('').map((char) => new RenderItem<string>(char));
		this._frame();

		let pntLeft = 0;
		let pntRight = this._array.length - 1;

		while (pntLeft <= pntRight) {
			this._setItemState(pntLeft, ElementStates.Changing);
			this._setItemState(pntRight, ElementStates.Changing);
			this._frame();

			this._swap(pntLeft, pntRight);

			this._setItemState(pntLeft, ElementStates.Modified);
			this._setItemState(pntRight, ElementStates.Modified);
			this._frame();

			pntLeft += 1;
			pntRight -= 1;
		}

		return [...this._array];
	}
}
