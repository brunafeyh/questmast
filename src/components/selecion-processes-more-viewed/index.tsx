import { FC } from "react";
import { useSelectionProcessesMoreViewed } from "../../hooks/selection-process/use-selection-process-viewed";
import { useNavigate } from "react-router-dom";
import { useStatus } from "../../hooks/use-status";
import { useInstitution } from "../../hooks/use-institution";
import { useFederateUnit } from "../../hooks/use-federate-unit";
import { ColumnDef } from "@tanstack/react-table";
import { YearOptions } from "../../utils/constants/year";
import { transformSelectionProcesses } from "../../utils/selection-process-summary";
import { usePaginateArray } from "../../hooks/use-paginate-array";
import Table from "../table";
import { TableCellBody, TableRowBody } from "../table/styles";
import { StatusChip } from "../chips/status-chip";

export const SelectionProcessMoreViewed: FC = () => {
    const { selectionProcesses, isLoading, error } = useSelectionProcessesMoreViewed()
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

    const data = transformSelectionProcesses(selectionProcesses)

    const paginatedData = usePaginateArray(data || [])

    return (
        <Table
            columns={columns}
            data={paginatedData}
            totalRows={data?.length || 0}
            isLoading={isLoading}
            error={error}
            renderData={(row) =>
                <TableRowBody key={row.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`details/${row.original.idSelectionProcess}`)}>
                    <TableCellBody>{row.original.title}</TableCellBody>
                    <TableCellBody>{row.original.institution}</TableCellBody>
                    <TableCellBody>{row.original.year}</TableCellBody>
                    <TableCellBody>{row.original.state}</TableCellBody>
                    <TableCellBody>
                        <StatusChip status={row.original.status} />
                    </TableCellBody>
                </TableRowBody>}
        />
    )
}