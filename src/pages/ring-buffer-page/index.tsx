import { RingBufferVisualizer } from '../../features/ring-buffer-visualizer';
import { SolutionLayout } from '../../shared/ui/solution-layout';

export function RingBufferPage() {
	return (
		<SolutionLayout title="Кольцевой буфер">
			<RingBufferVisualizer />
		</SolutionLayout>
	);
}
