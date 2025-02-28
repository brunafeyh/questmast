import { FC } from 'react'
import { Button } from '@mui/material'
import { PageLayout } from '../../layout'
import { useNavigate } from 'react-router-dom'
import { usePaginateArray } from '../../hooks/use-paginate-array'
import { ColumnDef, Row } from '@tanstack/react-table'
import { TableCellBody, TableRowBody } from '../../components/table/styles'
import { StatusChip } from '../../components/chips/status-chip'
import Table from '../../components/table'
import { Add, ArrowUpRight } from '@carbon/icons-react'
import PagesHeader from '../../components/pages-header'
import { Modal, useModal } from '../../components/modal'
import { BoxModal } from '../../components/modal/styles'
import SelectionProcessForm from '../../components/forms/add-selection-process'
import { useSelectionProcesses } from '../../hooks/selection-process/use-selection-process'
import { transformSelectionProcesses } from '../../utils/selection-process-summary'

function renderData(row: Row<any>, navigate: ReturnType<typeof useNavigate>) {
    return (
        <TableRowBody key={row.id}>
            <TableCellBody>{row.original.title}</TableCellBody>
            <TableCellBody>{row.original.institution}</TableCellBody>
            <TableCellBody>{row.original.year}</TableCellBody>
            <TableCellBody>{row.original.state}</TableCellBody>
            <TableCellBody>
                <StatusChip status={row.original.status} />
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
        {
            accessorKey: 'edit',
            header: 'Visualizar Provas',
        },
    ]

    const { selectionProcesses } = useSelectionProcesses()

    const data = transformSelectionProcesses(selectionProcesses)

    const paginatedData = usePaginateArray(data || [])

    const modal = useModal()

    const handleOpenModal = () => modal.current?.openModal()

    const handleCloseModal = () => modal.current?.closeModal()

    return (
        <PageLayout title="Processos Seletivos">
            <PagesHeader
                title={'Processos Seletivos'}
                rightSideComponent={
                    <Button startIcon={<Add />} onClick={handleOpenModal}>Adicionar</Button>
                }
            />
            <Table
                columns={columns}
                data={paginatedData}
                totalRows={data?.length || 0}
                isLoading={false}
                error={null}
                renderData={(row) => renderData(row, navigate)}
            />

            <Modal ref={modal}>
                <BoxModal>
                    <SelectionProcessForm handleCloseModal={handleCloseModal} />
                </BoxModal>
            </Modal>
        </PageLayout>
    )
}
