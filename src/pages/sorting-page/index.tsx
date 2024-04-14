import { SortingVisualizer } from '../../features/sorting-visualizer';
import { SolutionLayout } from '../../shared/ui/solution-layout';

export function SortingPage() {
	return (
		<SolutionLayout title="Сортировка массива">
			<SortingVisualizer />
		</SolutionLayout>
	);
}
