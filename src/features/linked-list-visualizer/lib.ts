import { Nullable } from 'vitest';
import { FrameMaker, RenderItem } from '../../shared/helpers/entities';

class RenderNode extends RenderItem<string> {
	public next: Nullable<RenderNode>;

	constructor(
		value: string,
		next: Nullable<RenderNode> = null,
		head?: string | null,
		tail?: string | null,
		passed?: boolean
	) {
		super(value, head, tail, passed);
		this.next = next;
	}
}

export class LinkedList extends FrameMaker<RenderNode> {
	public head: Nullable<RenderNode> = null;
	private _size;
	private _maxSize;

	constructor(maxSize: number = Infinity, values?: (string | number)[]) {
		super();

		this._maxSize = maxSize;
		this._size = 0;

		if (!values || values.length === 0) return this;

		this.head = new RenderNode(String(values[0]));
		let curNode = this.head;
		this._size += 1;

		for (let i = 1; i < values.length && i < this._maxSize; i += 1) {
			curNode.next = new RenderNode(String(values[i]));
			curNode = curNode.next;
			this._size += 1;
		}
	}

	get size() {
		return this._size;
	}

	get maxSize() {
		return this._maxSize;
	}

	protected _frame(): void {
		const array: RenderNode[] = [];

		let curNode = this.head;

		while (curNode) {
			array.push({ ...curNode });
			if (!curNode.next) break;
			curNode = curNode.next;
		}

		this.onFrame(array);
	}

	private _removeByIdx(idx: number) {}

	private _pop() {}

	public append(value: string) {}

	public pop(idx?: number) {
		if (!idx) return this._pop();

		if (idx < 0 || idx >= this._size) {
			throw Error('index out of range');
		}

		return this._removeByIdx(idx);
	}

	public unshift(value: string) {}

	public shift() {}

	public insert(idx: number, value: string) {
		if (idx < 0 || idx >= this._size) {
			throw Error('index out of range');
		}
	}
}
