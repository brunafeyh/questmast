import { FC, useState, SyntheticEvent } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { PageLayout } from '../../layout'
import Table from '../../components/table'
import { TableRowBody, TableCellBody } from '../../components/table/styles'
import { usePaginateArray } from '../../hooks/use-paginate-array'
import PagesHeader from '../../components/pages-header'
import { Tab, Tabs } from './styles'

const TITLE = 'HomePage'

const columns: ColumnDef<any, any>[] = [
	{
		accessorKey: 'title',
		header: 'Título',
	},
	{
		accessorKey: 'institution',
		header: 'Instituição',
	},
	{
		accessorKey: 'year',
		header: 'Ano',
	},
	{
		accessorKey: 'state',
		header: 'Estado',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
]

const dataMaisProcurados = [
	{ title: 'Cell text 1', institution: 'Institution A', year: '2023', state: 'State A', status: 'Open' },
	{ title: 'Cell text 2', institution: 'Institution B', year: '2022', state: 'State B', status: 'Due' },
	{ title: 'Cell text 3', institution: 'Institution C', year: '2021', state: 'State C', status: 'Inactive' },
	{ title: 'Cell text 4', institution: 'Institution D', year: '2023', state: 'State D', status: 'Paid' },
]


const dataMaisVistos = [
	{ title: 'Cell text X', institution: 'Institution X', year: '2023', state: 'State X', status: 'Open' },
	{ title: 'Cell text Y', institution: 'Institution Y', year: '2022', state: 'State Y', status: 'Due' },
	{ title: 'Cell text Z', institution: 'Institution Z', year: '2021', state: 'State Z', status: 'Inactive' },
	{ title: 'Cell text W', institution: 'Institution W', year: '2023', state: 'State W', status: 'Paid' },
]

function renderData(row: Row<any>) {
	return (
		<TableRowBody key={row.id}>
			<TableCellBody>{row.getValue('title')}</TableCellBody>
			<TableCellBody>{row.getValue('institution')}</TableCellBody>
			<TableCellBody>{row.getValue('year')}</TableCellBody>
			<TableCellBody>{row.getValue('state')}</TableCellBody>
			<TableCellBody>{row.getValue('status')}</TableCellBody>
		</TableRowBody>
	)
}

const HomePage: FC = () => {
	const [value, setValue] = useState(0)

	const handleChange = (_: SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const selectedData = value === 0 ? dataMaisProcurados : dataMaisVistos
	const paginatedData = usePaginateArray(selectedData)

	console.log(value)

	return (
		<PageLayout title={TITLE}>
			<PagesHeader title={TITLE} />
			<Tabs
				value={value}
				onChange={handleChange}
				sx={{mb: 2}}
			>
				<Tab label="Concursos Mais Procurados" />
				<Tab label="Provas mais Procuradas" />
			</Tabs>
			<Table
				columns={columns}
				data={paginatedData}
				totalRows={selectedData.length}
				isLoading={false}
				error={null}
				renderData={renderData}
			/>
		</PageLayout>
	)
}

export default HomePage
