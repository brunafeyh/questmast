import { useState } from 'react'

import { Table } from '@tanstack/react-table'

export const useTableFilter = () => {
	const [activeFilter, setActiveFilter] = useState<string | null>(null)
	const [activeSortColumn, setActiveSortColumn] = useState<string | null>(null)

	const getFilterValue = (table: Table<any>) => {
		if (!activeFilter) return ''
		const column = table.getColumn(activeFilter)
		if (column) return column.getFilterValue()
		return ''
	}

	const setFilterValue = (value: any, table: Table<any>) => {
		if (!activeFilter) return
		const column = table.getColumn(activeFilter)
		if (column) column.setFilterValue(value)
	}

	const getFilterVariantByAccessorKey = (table: any) => {
		const matchingColumn = table.getAllColumns().find((column: any) => {
			return column.id === activeFilter || column.columnDef.accessorKey === activeFilter
		})

		if (matchingColumn && matchingColumn.columnDef.meta?.filterVariant) {
			return matchingColumn.columnDef.meta.filterVariant
		}

		return 'unknown'
	}

	const getOptionsByAccessorKey = (columns: Array<any>) => {
		const matchingColumn = columns.find((column) => column.accessorKey === activeFilter)

		if (
			matchingColumn &&
			(matchingColumn.meta?.filterVariant === 'enum' || matchingColumn.meta?.filterVariant === 'list') &&
			matchingColumn.meta?.options
		) {
			return matchingColumn.meta.options
		}

		return null
	}

	return {
		activeFilter,
		setActiveFilter,
		activeSortColumn,
		setActiveSortColumn,
		getFilterValue,
		setFilterValue,
		getFilterVariantByAccessorKey,
		getOptionsByAccessorKey,
	}
}
