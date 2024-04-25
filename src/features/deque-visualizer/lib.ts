import { Nullable } from 'vitest';
import { FrameMaker, RenderItem } from '../../shared/helpers/entities';
import { ElementStates } from '../../shared/types';

const LABEL_HEAD = 'head';
const LABEL_TAIL = 'tail';

export class RenderNode extends RenderItem<string> {
	public next: Nullable<RenderNode>;
	public prev: Nullable<RenderNode>;

	constructor(
		prev: Nullable<RenderNode> = null,
		value: string,
		next: Nullable<RenderNode> = null,
		state: ElementStates = ElementStates.Default,
		head?: string | RenderItem<string> | null,
		tail?: string | RenderItem<string> | null,
		passed?: boolean
	) {
		super(value, state, head, tail, passed);
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

		values.forEach((v) => this.pushBack(String(v)));
		this._head.next.head = LABEL_HEAD;
		this._tail.prev.tail = LABEL_TAIL;
	}

	get items() {
		const renderList: RenderNode[] = [];

		let curNode = this._head.next;

		while (curNode && curNode.value !== Deque.DUMMY_TAIL) {
			const renderItem = Object.assign({}, curNode);
			Object.setPrototypeOf(renderItem, curNode);

			if (curNode.head instanceof RenderNode) {
				renderItem.head = Object.assign({}, curNode.head);
				Object.setPrototypeOf(renderItem.head, curNode.head);
			}

			if (curNode.tail instanceof RenderNode) {
				renderItem.tail = Object.assign({}, curNode.tail);
				Object.setPrototypeOf(renderItem.tail, curNode.tail);
			}

			renderList.push(renderItem);
			curNode = curNode.next;
		}
		return renderList;
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
		this.onFrame(this.items);
	}

	public pushFront(value: string) {
		const node = new RenderNode(this.head, value, this.head.next);

		if (!this._head.next || !this._tail.prev) return;

		if (this._size > 0) {
			node.state = ElementStates.Changing;
			this._head.next.head = node;
			this._frame();
		}

		this._head.next.head = null;
		this._head.next.prev = node;
		this._head.next = node;

		node.head = LABEL_HEAD;

		this._tail.prev.tail = LABEL_TAIL;

		node.state = ElementStates.Modified;
		this._frame();
		node.state = ElementStates.Default;
		this._frame();

		this._size += 1;

		return this._size;
	}

	public popFront() {
		if (!this._size) {
			throw Error('deque is empty');
		}

		const node = this._head.next;

		if (!node || !node.next) return;

		node.tail = new RenderNode(null, node.value, null, ElementStates.Changing);
		node.value = '';
		this._frame();

		this._head.next = node.next;
		node.next.prev = this._head;
		this._head.next.head = LABEL_HEAD;
		this._frame();

		this._size -= 1;
		return node.value;
	}

	public pushBack(value: string) {
		const node = new RenderNode(this._tail.prev, value, this._tail);

		if (!this._tail.prev || !this._head.next) return;

		if (this._size > 0) {
			node.state = ElementStates.Changing;
			this._tail.prev.head = node;
			this._frame();
		}

		this._tail.prev.head = null;
		this._tail.prev.tail = null;
		this._tail.prev.next = node;
		this._tail.prev = node;

		node.tail = LABEL_TAIL;

		this._head.next.head = LABEL_HEAD;

		node.state = ElementStates.Modified;
		this._frame();
		node.state = ElementStates.Default;
		this._frame();

		this._size += 1;
		return this._size;
	}

	public popBack() {
		if (!this._size) {
			throw Error('deque is empty');
		}

		const node = this._tail.prev;

		if (!node || !node.prev) return;

		node.tail = new RenderNode(null, node.value, null, ElementStates.Changing);
		node.value = '';
		this._frame();

		this._tail.prev = node.prev;
		node.prev.next = this._tail;
		this._tail.prev.tail = LABEL_TAIL;
		this._frame();

		this._size -= 1;
		return node.value;
	}

	public insert(idx: number, value: string) {
		if (idx < 0 || idx >= this._size) {
			throw Error('index out of range');
		}

		let node = this._head.next;

		for (let i = 0; i < idx; i += 1) {
			node = node?.next;
		}

		if (!(node && node.prev && node.next)) return;

		const insertingNode = new RenderNode(node.prev, value, node);
		node.prev.next = insertingNode;
		node.prev = insertingNode;

		this._size += 1;

		return this._size;
	}

	public delete(idx: number) {
		if (!this._size) {
			throw Error('deque is empty');
		}

		if (idx < 0 || idx >= this._size) {
			throw Error('index out of range');
		}

		let node = this._head.next;

		for (let i = 0; i < idx; i += 1) {
			node = node?.next;
		}

		if (!(node && node.prev && node.next)) return;

		node.prev.next = node.next;
		node.next.prev = node.prev;

		this._size -= 1;

		return node.value;
	}
}
