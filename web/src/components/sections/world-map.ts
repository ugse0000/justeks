/**
 * A deliberately simplified world map.
 *
 * Equirectangular projection on a 1000x500 viewBox:
 *   x = (lon + 180) * (1000 / 360)
 *   y = (90 - lat) * (500 / 180)
 *
 * The outlines are approximate. This is a supply diagram, not an atlas: the
 * job is to place six regions recognisably around a UK origin point, so a
 * hand-drawn silhouette at ~4KB beats shipping a mapping library.
 */

export const WORLD_PATHS: string[] = [
  // North America
  'M42 56 L120 44 L222 46 L300 62 L333 92 L318 122 L292 148 L278 182 L250 194 L206 196 L178 176 L152 142 L118 112 L74 86 Z',
  // Greenland
  'M340 46 L400 34 L446 52 L418 78 L364 74 Z',
  // South America
  'M292 224 L340 228 L378 246 L404 274 L386 320 L344 372 L306 404 L298 358 L284 300 L276 262 Z',
  // Europe
  'M470 142 L488 118 L512 74 L530 56 L562 62 L610 84 L598 112 L566 144 L534 136 L506 148 Z',
  // Africa
  'M452 158 L520 148 L596 162 L622 192 L644 218 L630 272 L610 320 L570 348 L540 330 L518 280 L480 240 L452 208 L444 180 Z',
  // Asia
  'M610 84 L700 56 L800 48 L900 58 L982 72 L958 112 L890 142 L840 168 L800 192 L760 202 L716 230 L698 200 L658 190 L624 210 L614 180 L600 140 Z',
  // South-East Asia islands
  'M792 236 L826 232 L846 250 L812 258 Z',
  // Australia
  'M816 300 L856 282 L900 290 L926 326 L900 352 L858 358 L830 340 Z',
  // New Zealand
  'M948 350 L962 344 L968 366 L952 372 Z',
]

/** Origin point: the United Kingdom. */
export const ORIGIN = { x: 494, y: 100 }

/** Region anchor points, in the fixed order used across the site. */
export const REGION_POINTS: Record<string, { x: number; y: number }> = {
  europe: { x: 546, y: 112 },
  turkiye: { x: 596, y: 142 },
  'middle-east': { x: 634, y: 182 },
  'north-africa': { x: 528, y: 174 },
  americas: { x: 268, y: 196 },
  asia: { x: 792, y: 168 },
}

/**
 * A quadratic arc from the origin to a region. The control point is lifted
 * perpendicular to the chord so routes bow outward like flight paths rather
 * than cutting straight across the map.
 */
export function arcPath(to: { x: number; y: number }, lift = 0.22): string {
  const dx = to.x - ORIGIN.x
  const dy = to.y - ORIGIN.y
  const mx = (ORIGIN.x + to.x) / 2
  const my = (ORIGIN.y + to.y) / 2
  // Perpendicular offset, scaled by chord length.
  const cx = mx + dy * lift
  const cy = my - dx * lift
  return `M${ORIGIN.x} ${ORIGIN.y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${to.x} ${to.y}`
}
