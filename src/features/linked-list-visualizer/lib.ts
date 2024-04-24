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
	private _head: Nullable<RenderNode> = null;
	private _size;
	private _maxSize;

	constructor(maxSize: number = Infinity, values?: (string | number)[]) {
		super();

		this._maxSize = maxSize;
		this._size = 0;

		if (!values || values.length === 0) return this;

		this._head = new RenderNode(String(values[0]));
		let curNode = this._head;
		this._size += 1;

		for (let i = 1; i < values.length && i < this._maxSize; i += 1) {
			curNode.next = new RenderNode(String(values[i]));
			curNode = curNode.next;
			this._size += 1;
		}
	}

	get head() {
		return this._head;
	}

	get size() {
		return this._size;
	}

	get maxSize() {
		return this._maxSize;
	}

	protected _frame(): void {
		const array: RenderNode[] = [];

		let curNode = this._head;

		while (curNode) {
			array.push({ ...curNode });
			if (!curNode.next) break;
			curNode = curNode.next;
		}

		this.onFrame(array);
	}

	private _removeByIdx(idx: number) {}

	private _pop() {
		if (!this._head) {
			throw Error('empty list');
		}

		let curNode: Nullable<RenderNode> = this._head;
		let prev;

		while (curNode) {
			if (!curNode.next) {
			}
		}
	}

	public append(value: string) {
		const node = new RenderNode(value);

		if (!this._tail) {
			this._head = this._tail = node;
		} else {
			this._tail.next = node;
		}

		this._size += 1;
	}

	public pop(idx?: number) {
		if (!idx) return this._pop();

		if (idx < 0 || idx >= this._size) {
			throw Error('index out of range');
		}

		return this._removeByIdx(idx);
	}

	public unshift(value: string) {
		if (this._size === 0) {
			return this.append(value);
		}
	}

	public shift() {}

	public insert(idx: number, value: string) {
		if (idx < 0 || idx >= this._size) {
			throw Error('index out of range');
		}
	}
}
