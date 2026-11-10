import type { ProfilerOnRenderCallback } from 'react';

// Writes every <Profiler> measurement to the console.
export const logRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration
) => {
  console.info(`[Profiler] ${id} ${phase}: ${actualDuration.toFixed(1)} ms`);
};
