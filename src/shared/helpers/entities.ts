import { nanoid } from 'nanoid';
import { ElementStates, TListNode } from '../types';

export class RenderItem<T = number> {
	id: string;
	value: T;
	state;
	head?;
	tail?;
	passed?;

	constructor(
		value: T,
		state: ElementStates = ElementStates.Default,
		head?: string | RenderItem<T> | null,
		tail?: string | RenderItem<T> | null,
		passed?: boolean
	) {
		this.id = nanoid();
		this.value = value;
		this.state = state;

		this.head = head;

		this.tail = tail;

		this.passed = passed;
	}

	[Symbol.toPrimitive]() {
		return String(this.value);
	}
}

export class ListNode<T> implements TListNode<T> {
	id: string;
	value: T;
	state: ElementStates;
	next: TListNode<T> | null;

	constructor(value: T, next?: TListNode<T>) {
		this.id = nanoid();
		this.value = value;
		this.state = ElementStates.Default;
		this.next = next ? next : null;
	}
}

export abstract class FrameMaker<T> {
	public onFrame: (array: T[]) => void;
	constructor() {
		this.onFrame = () => {};
	}

	protected abstract _frame(): void;
}
