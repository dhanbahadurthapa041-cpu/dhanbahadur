/**
 * GrainOverlay renders a fixed, single-layer SVG fractal noise overlay
 * that provides a subtle analog, paper-like tactile grain without
 * per-frame recalculation or scrolling repaints.
 * (Implementationplan.md §4B)
 */
export default function GrainOverlay() {
  return <div aria-hidden="true" className="grain-overlay" />;
}
