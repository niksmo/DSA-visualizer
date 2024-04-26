import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ElementStates } from '../../helpers/entities';
import { Circle } from '.';

describe('Circle component test', () => {
	it('should render with text', () => {
		const { getByTestId } = render(<Circle letter="abcd" />);

		const circleText = getByTestId('circle-value');

		expect(circleText.textContent).equal('abcd');

		expect(circleText).toMatchSnapshot();
	});

	it('should render without text', () => {
		const { getByTestId } = render(<Circle />);

		const emptyCircle = getByTestId('circle');

		expect(emptyCircle).toBeInstanceOf(HTMLElement);

		expect(emptyCircle).toMatchSnapshot();
	});

	it('should render with text in head', () => {
		const { getByTestId } = render(<Circle head="abcd" />);

		const circleHeadText = getByTestId('circle-head');

		expect(circleHeadText.textContent).equal('abcd');

		expect(circleHeadText).toMatchSnapshot();
	});

	it('should render with react element in head', () => {
		const { getByText } = render(<Circle head={<a>abcd</a>} />);

		const circleWithElemInHead = getByText('abcd');

		expect(circleWithElemInHead.textContent).equal('abcd');

		expect(circleWithElemInHead).toMatchSnapshot();
	});

	it('should render with text in tail', () => {
		const { getByTestId } = render(<Circle tail="abcd" />);

		const circleWithTextInTail = getByTestId('circle-tail');

		expect(circleWithTextInTail.textContent).equal('abcd');

		expect(circleWithTextInTail).toMatchSnapshot();
	});

	it('should render with react element in tail', () => {
		const { getByText } = render(<Circle tail={<a>abcd</a>} />);

		const circleWithElemInTail = getByText('abcd');

		expect(circleWithElemInTail.textContent).equal('abcd');

		expect(circleWithElemInTail).toMatchSnapshot();
	});

	it('should render with index', () => {
		const { getByTestId } = render(<Circle index={5} />);

		const circleWithIndex = getByTestId('circle-index');

		expect(circleWithIndex.textContent).equal('5');

		expect(circleWithIndex).toMatchSnapshot();
	});

	it('should render with small prop', () => {
		const { getByTestId } = render(<Circle small />);

		const circleWithIndex = getByTestId('circle-main');

		expect(circleWithIndex.className.indexOf('small')).toBeGreaterThan(-1);

		expect(circleWithIndex).toMatchSnapshot();
	});

	it('should render with all existing states', () => {
		const { container, getByText } = render(
			<>
				<Circle state={ElementStates.Default} letter="1" />
				<Circle state={ElementStates.Changing} letter="2" />
				<Circle state={ElementStates.Modified} letter="3" />
			</>
		);

		const defaultState = getByText('1');
		const changingState = getByText('2');
		const modifiedState = getByText('3');

		expect(defaultState.textContent).equal('1');
		expect(changingState.textContent).equal('2');
		expect(modifiedState.textContent).equal('3');

		expect(container).toMatchSnapshot();
	});
});
