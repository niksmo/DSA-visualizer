import { ElementStates } from './element-states';

export type TListNode<T> = {
	id: string;
	value: T;
	state: ElementStates;
	next: TListNode<T> | null;
};
