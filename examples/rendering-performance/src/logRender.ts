import type { ProfilerOnRenderCallback } from 'react';

// Schreibt jede Messung des <Profiler> in die Konsole.
export const logRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration
) => {
  console.info(`[Profiler] ${id} ${phase}: ${actualDuration.toFixed(1)} ms`);
};
