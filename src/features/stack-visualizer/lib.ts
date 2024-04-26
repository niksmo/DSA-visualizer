import {
	RenderItem,
	FrameMaker,
	ElementStates
} from '../../shared/helpers/entities';

const LABEL_TOP = 'top';

export class Stack extends FrameMaker<RenderItem<string>> {
	private _array: RenderItem<string>[] = [];
	private _maxSize;

	constructor(maxSize: number) {
		super();
		this._maxSize = maxSize;
	}

	protected _frame() {
		this.onFrame(this._array.map((item) => Object.assign({}, item)));
	}

	get top() {
		return this._array[this._array.length - 1];
	}

	get size() {
		return this._array.length;
	}

	get maxSize() {
		return this._maxSize;
	}

	public push(value: string) {
		if (this._array.length === this._maxSize) return;

		if (this._array.length) this.top.head = null;

		const item = new RenderItem(value, ElementStates.Default, LABEL_TOP);
		item.state = ElementStates.Changing;
		this._array.push(item);
		this._frame();
		item.state = ElementStates.Default;
		this._frame();
	}

	public pop() {
		this.top.state = ElementStates.Changing;
		this._frame();

		const item = this._array.pop();
		if (this._array.length) this.top.head = LABEL_TOP;
		this._frame();

		return item?.value;
	}

	public clear() {
		this._array = [];
	}
}
