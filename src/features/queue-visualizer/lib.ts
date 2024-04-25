import { RenderItem, FrameMaker } from '../../shared/helpers/entities';
import { ElementStates } from '../../shared/types';

const LABEL_HEAD = 'head';
const LABEL_TAIL = 'tail';

export class Queue extends FrameMaker<RenderItem<string>> {
	private _array: RenderItem<string>[] = [];
	private _maxSize: number;
	private _size = 0;
	private _head = 0;
	private _tail = 0;

	constructor(maxSize: number) {
		super();
		this._maxSize = maxSize;
		this.clear();
	}

	get size() {
		return this._size;
	}

	get maxSize() {
		return this._maxSize;
	}

	get head() {
		return this._head;
	}

	get tail() {
		return this._tail;
	}

	get items() {
		return this._array.map((item) => Object.assign({}, item));
	}

	protected _frame(): void {
		this.onFrame(this._array.map((item) => Object.assign({}, item)));
	}

	public enqueue(value: string) {
		if (this._size === this._maxSize) return;

		this._array[this._tail].tail = '';

		this._size += 1;

		if (this._size > 1) {
			this._tail = (this._tail + 1) % this._maxSize;
		}

		this._array[this._tail] = new RenderItem(value);
		this._array[this._tail].state = ElementStates.Changing;
		this._array[this._tail].tail = LABEL_TAIL;

		if (this.size === 1) {
			this._array[this._tail].head = LABEL_HEAD;
		}
		this._frame();

		this._array[this._tail].state = ElementStates.Default;
		this._frame();
	}

	public dequeue() {
		if (this.size === 0) return;

		this._array[this._head].state = ElementStates.Changing;
		this._frame();

		this._array[this._head].state = ElementStates.Default;
		this._array[this._head].head = '';
		this._array[this._head].value = '';

		this._size -= 1;

		if (this._size > 0) {
			this._head = (this._head + 1) % this._maxSize;
			this._array[this._head].head = LABEL_HEAD;
		} else {
			this._array[this._head].tail = '';
			this._head = 0;
			this._tail = 0;
		}

		this._frame();
	}

	public clear() {
		this._array = new Array(this._maxSize)
			.fill(null)
			.map(() => new RenderItem(''));

		this._head = 0;
		this._tail = 0;
		this._size = 0;
	}
}
