import { DequeVisualizer } from '../../features/deque-visualizer';
import { SolutionLayout } from '../../shared/ui/solution-layout';

export function DequePage() {
	return (
		<SolutionLayout title={`Дек\nСтруктура - двусвязный список`}>
			<DequeVisualizer />
		</SolutionLayout>
	);
}
