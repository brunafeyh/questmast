import { ColumnDef, Row } from "@tanstack/react-table"
import { useNavigate } from "react-router-dom"
import { TableCellBody, TableRowBody } from "../table/styles"
import { Button } from "@mui/material"
import { ArrowUpRight } from "@carbon/icons-react"
import { FC } from "react"
import { usePaginateArray } from "../../hooks/use-paginate-array"
import Table from "../table"

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
        accessorKey: 'jury',
        header: 'Banca',
    },
    {
        accessorKey: 'role',
        header: 'Cargo',
    },
    {
        accessorKey: 'date',
        header: 'Data',
    },
    {
        accessorKey: 'visualizarProvas',
        header: 'Visualizar Provas',
    },
]

const data = [
    { id: '1', title: 'Cell text 1', institution: 'Institution A', year: '2023', jury: 'blablbalba', role: 'blablba', date: '01/01/2001', status: 'Open' },
    { id: '2', title: 'Cell text 2', institution: 'Institution B', year: '2022', jury: 'blablbalba', role: 'blablba', date: '01/01/2001', status: 'Due' },
    { id: '3', title: 'Cell text 3', institution: 'Institution C', year: '2021', jury: 'blablbalba', role: 'blablba', date: '01/01/2001', status: 'Inactive' },
    { id: '4', title: 'Cell text 4', institution: 'Institution D', year: '2023', jury: 'blablbalba', role: 'blablba', date: '01/01/2001', status: 'Paid' },
]


function renderData(row: Row<any>) {
    const navigate = useNavigate()

    return (
        <TableRowBody key={row.id}>
            <TableCellBody>{row.getValue('title')}</TableCellBody>
            <TableCellBody>{row.getValue('institution')}</TableCellBody>
            <TableCellBody>{row.getValue('year')}</TableCellBody>
            <TableCellBody>{row.getValue('jury')}</TableCellBody>
            <TableCellBody>{row.getValue('role')}</TableCellBody>
            <TableCellBody>{row.getValue('date')}</TableCellBody>
            <TableCellBody>
                <Button
                    variant="text"
                    startIcon={<ArrowUpRight style={{ width: 18, height: 18 }} />}
                    onClick={() => navigate(`questionary-view-responded/${row.original.id}`)}
                >
                    Visualizar
                </Button>
            </TableCellBody>
        </TableRowBody>
    )
}

export const QuestionaryTable: FC = () => {
    const paginatedData = usePaginateArray(data)
    return (
        <Table
            columns={columns}
            data={paginatedData}
            totalRows={data.length}
            isLoading={false}
            error={null}
            renderData={renderData}
        />
    )
}