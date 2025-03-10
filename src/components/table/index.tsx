import { ChangeEvent, FC, MouseEvent, ReactNode } from 'react'
import { Filter } from '@carbon/icons-react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Button, MenuItem, Table as MuiTable, Paper, Skeleton, TableBody, useTheme } from '@mui/material'
import {
	ColumnDef,
	Row,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import FilterTextField from './filter-input'
import SortIcon from './sort-icon'
import { Popover, usePopover } from '../popover'
import { usePaginationParams } from '../../hooks/params/pagination'
import { useTableFilter } from '../../hooks/use-table-filter'
import { useTableQueryParams } from '../../hooks/use-table-query-paramns'
import { DESCEND } from '../../utils/constants/tables'
import { Direction } from '../../types/filter'
import { EmptyTableTitle, TableCellBody, TableCellHead, TableHead, TablePagination, TableRowBody, TableRowHead } from './styles'
import { isEmptyData, isValidHeader } from '../../utils/filter'
import { isFiltered } from '../../utils/table'

type TableProps = {
	columns: ColumnDef<any, any>[]
	data: any[]
	totalRows: number
	renderData: (row: Row<any>, index: number) => ReactNode
	isLoading: boolean
	error: Error | null
}

const Table: FC<TableProps> = ({ columns, data, totalRows, renderData, isLoading, error }) => {
	const {
		setActiveFilter,
		activeSortColumn,
		setActiveSortColumn,
		getFilterValue,
		setFilterValue,
		getFilterVariantByAccessorKey,
		getOptionsByAccessorKey,
	} = useTableFilter()
	const {
		sorting,
		setSorting,
		filters: columnFilters,
		setFilters: setColumnFilters,
		clearSorting,
		clearFilters,
	} = useTableQueryParams()
	const { page, pageSize, changePage, changePageSize } = usePaginationParams()
	const rowsPerPageOptions = [5, 10, 15, 20]

	const popoverFilter = usePopover()
	const popoverSort = usePopover()

	const theme = useTheme()

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		manualPagination: true,
	})

	const handlePageChange = (_: unknown, newPage: number) => changePage(newPage)

	const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
		changePageSize(Number.parseInt(event.target.value, 10))
	}

	const handleFilterClick = (event: MouseEvent<HTMLElement>, columnId: string) => {
		setActiveFilter(columnId)
		popoverFilter.current?.openPopover(event.currentTarget)
	}

	const handleSortClick = (event: MouseEvent<HTMLElement>, columnId: string) => {
		setActiveSortColumn(columnId)
		popoverSort.current?.openPopover(event.currentTarget)
	}

	const handleSortChange = (direction: Direction) => {
		setSorting([{ id: activeSortColumn!, desc: direction === DESCEND }])
		popoverSort.current?.closePopover()
	}

	const handleClearSort = () => {
		clearSorting()
		popoverSort.current?.closePopover()
	}

	const handleClearFilter = () => {
		setFilterValue('', table)
		clearFilters()
		popoverFilter.current?.closePopover()
	}

	const isActive = () => {
		if (sorting.length > 0) return activeSortColumn === sorting[0].id
		return false
	}

	const isAscActive = isActive() && !sorting[0].desc

	const isDescActive = isActive() && !isAscActive

	return (
		<Paper
			elevation={0}
			sx={{
				width: '100%',
				overflowX: 'auto',
			}}
		>
			<MuiTable
				sx={{
					width: '100%',
					tableLayout: 'fixed',
				}}
			>
				<TableHead>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRowHead key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableCellHead key={header.id}>
									{isValidHeader(header) && (
										<Box>
											{flexRender(header.column.columnDef.header, header.getContext())}
											<Button
												onClick={(e) => handleSortClick(e, header.column.id)}
												style={{
													marginLeft: 8,
													minWidth: 0,
													width: 16,
													height: 16,
													padding: 0.5,
												}}
												sx={(theme) => ({
													backgroundColor: 'transparent',
													color: theme.palette.juicy.neutral.c60,
													'&:hover': {
														backgroundColor: theme.palette.juicy.neutral.c40,
													},
												})}
											>
												<SortIcon sortState={header.column.getIsSorted()} />
											</Button>
											<Button
												onClick={(e) => handleFilterClick(e, header.column.id)}
												style={{ minWidth: 0, width: 16, height: 16, padding: 0.5 }}
												sx={(theme) => ({
													backgroundColor: 'transparent',
													color: theme.palette.juicy.neutral.c60,
													'&:hover': {
														backgroundColor: theme.palette.juicy.neutral.c40,
													},
												})}
											>
												<Filter style={{ width: 18, height: 18,  color: isFiltered(header.column.getFilterValue())
															? theme.palette.juicy.primary.c60
															: theme.palette.juicy.neutral.c60,}} />
											</Button>
										</Box>
									)}
								</TableCellHead>
							))}
						</TableRowHead>
					))}
				</TableHead>
				<TableBody>
					{error ? (
						<TableRowBody>
							<TableCellBody colSpan={columns.length} align="center">
								<ErrorOutlineIcon color="error" fontSize="large" />
								<EmptyTableTitle>Ops, algo deu errado!</EmptyTableTitle>
							</TableCellBody>
						</TableRowBody>
					) : isLoading ? (
						Array.from({ length: 5 }).map((_, idx) => (
							<TableRowBody key={idx}>
								{columns.map((_, colIdx) => (
									<TableCellBody key={colIdx}>
										<Skeleton animation="wave" height={25} />
									</TableCellBody>
								))}
							</TableRowBody>
						))
					) : isEmptyData(data) ? (
						<TableRowBody>
							<TableCellBody colSpan={columns.length} align="center">
								<EmptyTableTitle>Não foi possível encontrar nenhum registro</EmptyTableTitle>
							</TableCellBody>
						</TableRowBody>
					) : (
						table.getRowModel().rows.map(renderData)
					)}
				</TableBody>
			</MuiTable>
			{!isLoading && !error && (
				<TablePagination
					component={'div'}
					count={totalRows}
					rowsPerPage={pageSize}
					page={page}
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
					rowsPerPageOptions={rowsPerPageOptions}
					labelRowsPerPage="Linhas por página:"
					labelDisplayedRows={({ from, to, count }) => `${from} a ${to} de ${count}`}
				/>
			)}
			<Popover ref={popoverFilter}>
				<Box sx={{ padding: 2 }}>
					<FilterTextField
						filterType={getFilterVariantByAccessorKey(table)}
						options={getOptionsByAccessorKey(columns)}
						value={getFilterValue(table) || ''}
						onChange={(newValue) => setFilterValue(newValue, table)}
					/>
					<Button variant="text" color="secondary" onClick={handleClearFilter} sx={{ mt: 1, width: '100%' }}>
						Limpar
					</Button>
				</Box>
			</Popover>
			<Popover ref={popoverSort}>
				<Box style={{ padding: 8 }}>
					<MenuItem
						onClick={() => handleSortChange('asc')}
						sx={(theme) => ({
							backgroundColor: isAscActive
								? theme.palette.juicy.neutral.c30
								: theme.palette.juicy.neutral.c10,
							color: isAscActive ? theme.palette.juicy.primary.c60 : theme.palette.juicy.neutral.c100,
						})}
					>
						<ArrowDownwardIcon
							sx={(theme) => ({
								marginRight: 1,
								width: 18,
								height: 18,
								color: isAscActive ? theme.palette.juicy.primary.c60 : theme.palette.juicy.neutral.c60,
							})}
						/>{' '}
						Crescente
					</MenuItem>
					<MenuItem
						onClick={() => handleSortChange('desc')}
						sx={(theme) => ({
							backgroundColor: isDescActive
								? theme.palette.juicy.neutral.c30
								: theme.palette.juicy.neutral.c10,
							color: isDescActive ? theme.palette.juicy.primary.c60 : theme.palette.juicy.neutral.c100,
						})}
					>
						<ArrowUpwardIcon
							sx={(theme) => ({
								marginRight: 1,
								width: 18,
								height: 18,
								color: isDescActive ? theme.palette.juicy.primary.c60 : theme.palette.juicy.neutral.c60,
							})}
						/>{' '}
						Decrescente
					</MenuItem>
					<Button
						variant="text"
						color="secondary"
						onClick={handleClearSort}
						style={{ width: '100%', marginTop: 8 }}
					>
						Limpar
					</Button>
				</Box>
			</Popover>
		</Paper>
	)
}

export default Table
