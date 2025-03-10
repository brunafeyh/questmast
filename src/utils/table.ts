export const isFiltered = (filterVal: unknown): boolean => {
	if (filterVal === undefined) return false
	if (Array.isArray(filterVal)) return filterVal.length > 0
	return filterVal !== ''
}