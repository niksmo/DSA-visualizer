import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '.';

describe('Button component test', () => {
	it('should render with text', () => {
		const { getByRole } = render(<Button text="clickMe" />);
		const button = getByRole('button');
		expect(button).toMatchSnapshot();
	});

	it('should render without text', () => {
		const { getByRole } = render(<Button />);
		const button = getByRole('button');
		expect(button).toMatchSnapshot();
	});

	it('should render disabled state', () => {
		const { getByRole } = render(<Button disabled />);
		const button = getByRole('button');
		expect(button).toMatchSnapshot();
	});

	it('should render loading state', () => {
		const { getByRole } = render(<Button loader />);
		const button = getByRole('button');
		expect(button).toMatchSnapshot();
	});

	it('should click', () => {
		const click = vi.fn();
		const { getByRole } = render(<Button onClick={click} />);

		const button = getByRole('button');
		button.click();

		expect(click).toBeCalledTimes(1);

		userEvent.click(button);

		expect(click).toHaveBeenCalledTimes(1);
	});
});
