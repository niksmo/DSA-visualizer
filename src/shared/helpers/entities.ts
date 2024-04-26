import { nanoid } from 'nanoid';

export const enum ElementStates {
	Default = 'default',
	Changing = 'changing',
	Modified = 'modified'
}

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

export abstract class FrameMaker<T> {
	public onFrame: (array: T[]) => void;
	constructor() {
		this.onFrame = () => {};
	}

	protected abstract _frame(): void;
}
