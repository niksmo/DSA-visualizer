import { ReverseVisualizer } from '../../features/string-reverse-visualizer';
import { SolutionLayout } from '../../shared/ui/solution-layout';

export function StringComponent() {
  return (
    <SolutionLayout title="Строка">
      <ReverseVisualizer />
    </SolutionLayout>
  );
}
