import { useCallback, useState } from 'react'
import { ColumnFiltersState, SortingState, Updater } from '@tanstack/react-table'
import { useQueryParams } from './params/query-params'
import { ASCENT, DESCEND, FILTER_KEY, SORT_BY_KEY, SORT_ORDER_KEY } from '../utils/constants/tables'
import { getInitialFilters, getInitialSorting } from '../utils/filter'

export const useTableQueryParams = () => {
	const { getQueryParam, setQueryParam, removeQueryParam } = useQueryParams()

	const [sorting, setSorting] = useState<SortingState>(getInitialSorting(getQueryParam))
	const [filters, setFilters] = useState<ColumnFiltersState>(getInitialFilters(getQueryParam))

	const updateSorting = useCallback(
		(newSortingOrUpdater: Updater<SortingState>) => {
			const newSorting =
				typeof newSortingOrUpdater === 'function' ? newSortingOrUpdater(sorting) : newSortingOrUpdater
			setSorting(newSorting)
			if (newSorting.length > 0) {
				setQueryParam(SORT_BY_KEY, newSorting[0].id)
				setQueryParam(SORT_ORDER_KEY, newSorting[0].desc ? DESCEND : ASCENT)
			} else {
				removeQueryParam(SORT_BY_KEY)
				removeQueryParam(SORT_ORDER_KEY)
			}
		},
		[sorting, setQueryParam, removeQueryParam]
	)

	const updateFilters = useCallback(
		(newFiltersOrUpdater: Updater<ColumnFiltersState>) => {
			const newFilters =
				typeof newFiltersOrUpdater === 'function' ? newFiltersOrUpdater(filters) : newFiltersOrUpdater
			setFilters(newFilters)
			if (newFilters.length > 0) setQueryParam(FILTER_KEY, JSON.stringify(newFilters))
			else removeQueryParam(FILTER_KEY)
		},
		[filters, setQueryParam, removeQueryParam]
	)

	const clearSorting = useCallback(() => {
		setSorting([])
		removeQueryParam(SORT_BY_KEY)
		removeQueryParam(SORT_ORDER_KEY)
	}, [removeQueryParam])

	const clearFilters = useCallback(() => {
		setFilters([])
		removeQueryParam(FILTER_KEY)
	}, [removeQueryParam])

	return {
		sorting,
		setSorting: updateSorting,
		filters,
		setFilters: updateFilters,
		clearSorting,
		clearFilters,
	}
}
