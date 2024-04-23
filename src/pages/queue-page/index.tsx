import { QueueVisualizer } from '../../features/queue-visualizer';
import { SolutionLayout } from '../../shared/ui/solution-layout';

export function RingBufferPage() {
	return (
		<SolutionLayout title="Очередь">
			<QueueVisualizer />
		</SolutionLayout>
	);
}
