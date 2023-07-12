export function findItemIndex<T>(array: T[], condition: (item: T) => boolean): number {
  return array.findIndex(condition)
}
