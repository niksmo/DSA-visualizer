import { RenderItem, FrameMaker } from '../../shared/helpers/entities';

export class FibCalculator extends FrameMaker<RenderItem<number>> {
	private _array: RenderItem<number>[] = [];

	protected _frame(): void {
		this.onFrame(this._array.map((item) => ({ ...item })));
	}

	public compute(num: number) {
		if (num < 0) return -1;

		this._array = [];
		let a = 0;
		let b = 1;
		let c = -1;

		while (this._array.length < 2) {
			(this._array.length === 0 && this._array.push(new RenderItem(a))) ||
				this._array.push(new RenderItem(b));
			this._frame();
		}

		while (this._array.length <= num) {
			c = a + b;
			a = b;
			b = c;

			this._array.push(new RenderItem(c));
			this._frame();
		}

		return c;
	}
}
