import { ColumnFiltersState, Header, SortingState } from '@tanstack/react-table'

export const getInitialSorting = (getQueryParam: (key: string, defaultValue: string) => string): SortingState => {
	const sortBy = getQueryParam('sortBy', '')
	const sortOrder = getQueryParam('sortOrder', 'asc')
	if (sortBy) return [{ id: sortBy, desc: sortOrder === 'desc' }]
	return []
}

export const getInitialFilters = (getQueryParam: (key: string, defaultValue: string) => string): ColumnFiltersState => {
	const filtersFromQuery = getQueryParam('filters', '')
	if (filtersFromQuery) return JSON.parse(filtersFromQuery)
	return []
}

export const ascDirection = (direction: string | boolean) => {
	return direction == 'asc'
}
export const descDirection = (direction: string | boolean) => {
	return direction == 'desc'
}

export const isEmptyData = (data: any) => {
	return data.length === 0
}

export const isValidHeader = (header: Header<any, unknown>) => {
	return !header.isPlaceholder && header.id !== 'edit'
}

export const getValidId = (id?: string): number => {
	const parsedId = Number(id)
	if (!isNaN(parsedId) && parsedId > 0) return parsedId
	return 0
}
