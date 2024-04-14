import { FibCalcVisualizer } from '../../features/fib-calc-visualizer';
import { SolutionLayout } from '../../shared/ui/solution-layout';

export function FibonacciPage() {
	return (
		<SolutionLayout title="Последовательность Фибоначчи">
			<FibCalcVisualizer />
		</SolutionLayout>
	);
}
