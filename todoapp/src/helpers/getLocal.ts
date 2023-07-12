export function getLocalStorageData<T>(
  key: string,
  targetArray: { value: T[] },
  itemType: string
): void {
  const storedData = localStorage.getItem(key)
  if (storedData) {
    const parsedData = JSON.parse(storedData) as T[]
    targetArray.value = parsedData.map((item) => {
      return { ...item, isEditing: false }
    })
  }
}
