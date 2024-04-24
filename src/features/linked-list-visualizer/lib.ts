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

	constructor(maxSize: number, values?: (string | number)[]) {
		super();

		this._maxSize = maxSize;
		this._size = 0;

		if (!values || values.length == 0) return this;

		this.head = new RenderNode(String(values[0]));
		this._size += 1;

		let curNode = this.head;
		for (let i = 1; i < values.length && i < this._maxSize; i += 1) {
			curNode.next = new RenderNode(String(values[i]));
			curNode = curNode.next;
			this._size += 1;
		}
	}

	protected _frame(): void {
		const array: RenderNode[] = [];

		if (this.head) {
			let curNode = this.head;

			for (let i = 0; i < this._size; i += 1) {
				array.push(curNode);
				if (!curNode.next) break;
				curNode = curNode.next;
			}
		}
		this.onFrame(array);
	}

	get size() {
		return this._size;
	}

	get maxSize() {
		return this._maxSize;
	}
}
