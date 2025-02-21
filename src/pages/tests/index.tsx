import { FC } from 'react'
import { ColumnDef, Row } from '@tanstack/react-table'
import { PageLayout } from '../../layout'
import Table from '../../components/table'
import { TableRowBody, TableCellBody } from '../../components/table/styles'
import { usePaginateArray } from '../../hooks/use-paginate-array'
import PagesHeader from '../../components/pages-header'
import { StatusChip } from '../../components/chips/status-chip'
import { Button } from '@mui/material'
import { ArrowUpRight } from '@carbon/icons-react'
import { useNavigate } from 'react-router-dom'

const columns: ColumnDef<any, any>[] = [
    {
        accessorKey: 'title',
        header: 'Título',
    },
    {
        accessorKey: 'role',
        header: 'Cargo',
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
        accessorKey: 'jury',
        header: 'Banca',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'visualizarQuestoes',
        header: 'Visualizar Questões',
    },
]

const data = [
    { id: '1', title: 'Cell text 1', role: 'Institution A', institution: 'Institution A', year: '2023', jury: 'State A', status: 'Open' },
    { id: '2', title: 'Cell text 2', role: 'Institution A', institution: 'Institution A', year: '2023', jury: 'State A', status: 'Due' },
    { id: '3', title: 'Cell text 3', role: 'Institution A', institution: 'Institution A', year: '2023', jury: 'State A', status: 'Inactive' },
    { id: '4', title: 'Cell text 4', role: 'Institution A', institution: 'Institution A', year: '2023', jury: 'State A', status: 'Paid' },
]


function renderData(row: Row<any>) {
    const status = row.getValue('status') as string

    const navigate = useNavigate()

    return (
        <TableRowBody key={row.id}>
            <TableCellBody>{row.getValue('title')}</TableCellBody>
            <TableCellBody>{row.getValue('role')}</TableCellBody>
            <TableCellBody>{row.getValue('institution')}</TableCellBody>
            <TableCellBody>{row.getValue('year')}</TableCellBody>
            <TableCellBody>{row.getValue('jury')}</TableCellBody>
            <TableCellBody>
                <StatusChip status={status} />
            </TableCellBody>
            <TableCellBody>
                <Button
                    variant="text"
                    startIcon={<ArrowUpRight style={{ width: 18, height: 18 }} />}
                    onClick={() => navigate(`/questions/${row.original.id}`)}
                >
                    Visualizar Questões
                </Button>
            </TableCellBody>
        </TableRowBody>
    )
}

const TestsPage: FC = () => {
    const paginatedData = usePaginateArray(data)

    const TITLE = `Provas`

    return (
        <PageLayout title={TITLE}>
            <PagesHeader title={TITLE} />
            <Table
                columns={columns}
                data={paginatedData}
                totalRows={data.length}
                isLoading={false}
                error={null}
                renderData={renderData}
            />
        </PageLayout>
    )
}

export default TestsPage