import { Nullable } from 'vitest';
import { FrameMaker, RenderItem } from '../../shared/helpers/entities';

class RenderNode extends RenderItem<string> {
	public next: Nullable<RenderNode>;
	public prev: Nullable<RenderNode>;

	constructor(
		prev: Nullable<RenderNode> = null,
		value: string,
		next: Nullable<RenderNode> = null,
		head?: string | null,
		tail?: string | null,
		passed?: boolean
	) {
		super(value, head, tail, passed);
		this.prev = prev;
		this.next = next;
	}
}

export class Deque extends FrameMaker<RenderNode> {
	private static DUMMY_HEAD = 'dummy-head';
	private static DUMMY_TAIL = 'dummy-tail';

	private _head: RenderNode;
	private _tail: RenderNode;
	private _size;
	private _maxSize;

	constructor(maxSize: number = Infinity, values?: (string | number)[]) {
		super();

		const dummyHeadNode = new RenderNode(null, Deque.DUMMY_HEAD, null);
		const dummyTailNode = new RenderNode(null, Deque.DUMMY_TAIL, null);
		this._head = dummyHeadNode;
		this._tail = dummyTailNode;
		this._head.next = this._tail;
		this._tail.prev = this._head;

		this._maxSize = maxSize;
		this._size = 0;

		if (!values || values.length === 0) return this;

		//pushBack() each value algorithm
		values.forEach((v) => this.pushBack(String(v)));
	}

	get head() {
		return this._head;
	}

	get tail() {
		return this._tail;
	}

	get size() {
		return this._size;
	}

	get maxSize() {
		return this._maxSize;
	}

	protected _frame(): void {
		const array: RenderNode[] = [];

		let curNode = this._head.next;

		while (curNode && curNode.value !== Deque.DUMMY_TAIL) {
			array.push({ ...curNode });
			curNode = curNode.next;
		}

		//debugg
		console.log(array.map((item) => item.value));

		this.onFrame(array);
	}

	public pushFront(value: string) {
		const node = new RenderNode(this.head, value, this.head.next);
		if (this.head.next) this.head.next.prev = node;
		this.head.next = node;
		this._size += 1;
		return this._size;
	}

	public popFront() {
		if (!this._size) {
			throw Error('deque is empty');
		}

		const node = this._head.next;

		if (!node || !node.next) return -1;

		this._head.next = node.next;
		node.next.prev = this._head;
		this._size -= 1;
		return node.value;
	}

	public pushBack(value: string) {
		const node = new RenderNode(this.tail.prev, value, this.tail);
		if (this._tail.prev) this._tail.prev.next = node;
		this._tail.prev = node;
		this._size += 1;
		return this._size;
	}

	public popBack() {
		if (!this._size) {
			throw Error('deque is empty');
		}

		const node = this._tail.prev;

		if (!node || !node.prev) return -1;

		this._tail.prev = node.prev;
		node.prev.next = this._tail;
		this._size -= 1;
		return node.value;
	}

	public insert(idx: number, value: string) {
		if (idx < 0 || idx >= this._size) {
			throw Error('index out of range');
		}
	}

	public delete(idx: number) {
		if (!this._size) {
			throw Error('deque is empty');
		}

		if (idx < 0 || idx >= this._size) {
			throw Error('index out of range');
		}
	}
}

const deque = new Deque(20, [5, 6, 7, 8, 9, 10]);
debugger;
