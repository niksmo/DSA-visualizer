import { LinkedListVisualizer } from '../../features/linked-list-visualizer';
import { SolutionLayout } from '../../shared/ui/solution-layout';

export function ListPage() {
  return (
    <SolutionLayout title="Связный список">
      <LinkedListVisualizer />
    </SolutionLayout>
  );
}
