import { FC } from 'react'
import { Button } from '@mui/material'
import { PageLayout } from '../../layout'
import { useNavigate } from 'react-router-dom'
import { usePaginateArray } from '../../hooks/use-paginate-array'
import { ColumnDef } from '@tanstack/react-table'
import { TableCellBody, TableRowBody } from '../../components/table/styles'
import { StatusChip } from '../../components/chips/status-chip'
import Table from '../../components/table'
import { Add } from '@carbon/icons-react'
import PagesHeader from '../../components/pages-header'
import { Modal, useModal } from '../../components/modal'
import { BoxModal } from '../../components/modal/styles'
import SelectionProcessForm from '../../components/forms/editandadd-selection-process'
import { useSelectionProcesses } from '../../hooks/selection-process/use-selection-process'
import { transformSelectionProcesses } from '../../utils/selection-process-summary'
import { useStatus } from '../../hooks/use-status'
import { useInstitution } from '../../hooks/use-institution'
import { useFederateUnit } from '../../hooks/use-federate-unit'
import { YearOptions } from '../../utils/constants/year'

export const SelectionProcess: FC = () => {
    const navigate = useNavigate()

    const { status } = useStatus()
    const { institutions } = useInstitution()
    const { federateUnit: federateUnits } = useFederateUnit()

    const institutionsOptions = institutions?.map(s => ({
        value: s.name,
        label: s.name
    })) || []


    const federateUnitsOptions = federateUnits?.map(s => ({
        value: s.name,
        label: s.name
    })) || []

    const statusOptions = status?.map(s => ({
        value: s.description,
        label: s.description
    })) || []

    const columns: ColumnDef<any, any>[] = [
        {
            accessorKey: 'title',
            header: 'Título',
        },
        {
            accessorKey: 'institution',
            header: 'Instituição',
            meta: { filterVariant: 'list', options: institutionsOptions }
        },
        {
            accessorKey: 'year',
            header: 'Ano',
            meta: { filterVariant: 'enum', options: YearOptions }
        },
        {
            accessorKey: 'state',
            header: 'Estado',
            meta: { filterVariant: 'list', options: federateUnitsOptions }
        },
        {
            accessorKey: 'status',
            header: 'Status',
            meta: { filterVariant: 'list', options: statusOptions }
        },
    ]

    const { selectionProcesses, isLoading, error } = useSelectionProcesses()

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
                isLoading={isLoading}
                error={error}
                renderData={(row) =>
                    <TableRowBody key={row.id} hover sx={{ cursor: 'grab' }} onClick={() => navigate(`details/${row.original.idSelectionProcess}`)}>
                        <TableCellBody>{row.original.title}</TableCellBody>
                        <TableCellBody>{row.original.institution}</TableCellBody>
                        <TableCellBody>{row.original.year}</TableCellBody>
                        <TableCellBody>{row.original.state}</TableCellBody>
                        <TableCellBody>
                            <StatusChip status={row.original.status}/>
                        </TableCellBody>
                    </TableRowBody>}
            />

            <Modal ref={modal}>
                <BoxModal>
                    <SelectionProcessForm handleCloseModal={handleCloseModal} />
                </BoxModal>
            </Modal>
        </PageLayout>
    )
}
