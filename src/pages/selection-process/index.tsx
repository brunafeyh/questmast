import { FC } from 'react'
import { Button } from '@mui/material'
import { PageLayout } from '../../layout'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePaginateArray } from '../../hooks/use-paginate-array'
import { Row } from '@tanstack/react-table'
import { TableCellBody, TableRowBody } from '../../components/table/styles'
import { StatusChip } from '../../components/chips/status-chip'
import Table from '../../components/table'
import { columns } from '../home'
import { Add, ArrowUpRight } from '@carbon/icons-react'
import { formatSeelectionProcessTitle } from '../../utils/get-title-format'
import PagesHeader from '../../components/pages-header'

const inscricoesabertas = [
    { title: 'Cell text 1', institution: 'Institution A', year: '2023', state: 'State A', status: 'Open' },
    { title: 'Cell text 2', institution: 'Institution B', year: '2022', state: 'State B', status: 'Due' },
    { title: 'Cell text 3', institution: 'Institution C', year: '2021', state: 'State C', status: 'Inactive' },
    { title: 'Cell text 4', institution: 'Institution D', year: '2023', state: 'State D', status: 'Paid' },
]


const previstos = [
    { title: 'Cell text X', institution: 'Institution X', year: '2023', state: 'State X', status: 'Open' },
    { title: 'Cell text Y', institution: 'Institution Y', year: '2022', state: 'State Y', status: 'Due' },
    { title: 'Cell text Z', institution: 'Institution Z', year: '2021', state: 'State Z', status: 'Inactive' },
    { title: 'Cell text W', institution: 'Institution W', year: '2023', state: 'State W', status: 'Paid' },
]

const todos = [
    { title: 'Cell text 1', institution: 'Institution A', year: '2023', state: 'State A', status: 'Open' },
    { title: 'Cell text 2', institution: 'Institution B', year: '2022', state: 'State B', status: 'Due' },
    { title: 'Cell text 3', institution: 'Institution C', year: '2021', state: 'State C', status: 'Inactive' },
    { title: 'Cell text 4', institution: 'Institution D', year: '2023', state: 'State D', status: 'Paid' },
    { title: 'Cell text X', institution: 'Institution X', year: '2023', state: 'State X', status: 'Open' },
    { title: 'Cell text Y', institution: 'Institution Y', year: '2022', state: 'State Y', status: 'Due' },
    { title: 'Cell text Z', institution: 'Institution Z', year: '2021', state: 'State Z', status: 'Inactive' },
    { title: 'Cell text W', institution: 'Institution W', year: '2023', state: 'State W', status: 'Paid' },
]

function renderData(row: Row<any>, navigate: ReturnType<typeof useNavigate>) {
    const status = row.getValue('status') as string

    return (
        <TableRowBody key={row.id}>
            <TableCellBody>{row.getValue('title')}</TableCellBody>
            <TableCellBody>{row.getValue('institution')}</TableCellBody>
            <TableCellBody>{row.getValue('year')}</TableCellBody>
            <TableCellBody>{row.getValue('state')}</TableCellBody>
            <TableCellBody>
                <StatusChip status={status} />
            </TableCellBody>
            <TableCellBody>
                <Button
                    variant="text"
                    startIcon={<ArrowUpRight style={{ width: 18, height: 18 }} />}
                    onClick={() => navigate(`/tests/${row.original.id}`)}
                >
                    Visualizar Provas
                </Button>
            </TableCellBody>
        </TableRowBody>
    )
}

export const SelectionProcess: FC = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const segments = pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]

    const selectedData = lastSegment === 'open-registration'
        ? inscricoesabertas
        : lastSegment === 'in-progress'
            ? previstos
            : todos

    const paginatedData = usePaginateArray(selectedData)

    return (
        <PageLayout title="Processos Seletivos">
            <PagesHeader
                title={`Processo Seletivos ${formatSeelectionProcessTitle(lastSegment)}`}
                rightSideComponent={
                    <Button startIcon={<Add />} onClick={() => navigate('/add-selection-process')}>Adicionar</Button>
                }
            />
            <Table
                columns={columns}
                data={paginatedData}
                totalRows={selectedData.length}
                isLoading={false}
                error={null}
                renderData={(row) => renderData(row, navigate)}
            />
        </PageLayout>
    )
}
