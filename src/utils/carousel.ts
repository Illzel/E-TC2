import type { DivisionId } from '../config/site';

export function getNextIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getPrevIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}

export function findIndexByDivision<T extends { divisionId: DivisionId }>(
  items: readonly T[],
  divisionId: DivisionId,
): number {
  const idx = items.findIndex((item) => item.divisionId === divisionId);
  return idx >= 0 ? idx : 0;
}
