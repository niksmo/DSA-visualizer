import { SolutionLayout } from '../../shared/ui/solution-layout';
import { StackVisualizer } from '../../features/stack-visualizer';

export function StackPage() {
	return (
		<SolutionLayout title="Стек">
			<StackVisualizer />
		</SolutionLayout>
	);
}
