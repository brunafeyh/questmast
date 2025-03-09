import { FC } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Table from '../../components/table'
import { usePaginateArray } from '../../hooks/use-paginate-array'
import { useFunctions } from '../../hooks/use-functions-'
import { YearOptions } from '../../utils/constants/year'
import { useMoreViewedTests } from '../../hooks/selection-process-test/use-more-viewed-tests'
import { transformTests } from '../../utils/selection-process-summary'
import { TableCellBody, TableRowBody } from '../table/styles'
import { useNavigate } from 'react-router-dom'


const TestsMoreViewed: FC = () => {
    const { selectionProcessesTest } = useMoreViewedTests()
    const navigate = useNavigate()
    const { functions } = useFunctions()

    const functionsOptions = functions?.map(s => ({
        value: s.name,
        label: s.name
    })) || []

    const columns: ColumnDef<any, any>[] = [
        {
            accessorKey: 'title',
            header: 'Título',
        },
        {
            accessorKey: 'functions',
            header: 'Cargo',
            meta: { filterVariant: 'list', options: functionsOptions }
        },
        {
            accessorKey: 'year',
            header: 'Ano',
            meta: { filterVariant: 'enum', options: YearOptions }
        },

    ]

    const data = selectionProcessesTest ? transformTests(selectionProcessesTest) : []

    const paginatedData = usePaginateArray(data || [])

    return (
        <Table
            columns={columns}
            data={paginatedData}
            totalRows={data.length}
            isLoading={false}
            error={null}
            renderData={(row) =>

                <TableRowBody
                    key={row.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        navigate(`/details-test/${row.original.idTest}`);
                    }}
                >
                    <TableCellBody>{row.original.title}</TableCellBody>
                    <TableCellBody>{row.original.function}</TableCellBody>
                    <TableCellBody>{row.original.year}</TableCellBody>
                </TableRowBody>}
        />

    )
}

export default TestsMoreViewed