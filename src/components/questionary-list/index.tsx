import { ColumnDef, Row } from "@tanstack/react-table"
import { TableCellBody, TableRowBody } from "../table/styles"
import { FC } from "react"
import { usePaginateArray } from "../../hooks/use-paginate-array"
import Table from "../table"
import { useQuestionnaries } from "../../hooks/use-questionnaruies"
import { useAuth } from "../../hooks/use-auth"
import { mapQuestionnairesToTableData } from "../../utils/convert-to-columns"

const columns: ColumnDef<any, any>[] = [
    {
        accessorKey: 'title',
        header: 'Título',
    },
]


function renderData(row: Row<any>) {
    return (
        <TableRowBody key={row.id}>
            <TableCellBody>{row.getValue('title')}</TableCellBody>
        </TableRowBody>
    )
}

export const QuestionaryTable: FC = () => {
    const { user } = useAuth()

    const filter = {
        studentMainEmail: user?.email || ''
    }

    const { data: questionnaries } = useQuestionnaries(filter)

    console.log(questionnaries)

    const responseData = mapQuestionnairesToTableData(questionnaries || [])

    const paginatedData = usePaginateArray(responseData || [])

    console.log(paginatedData)

    return (
        <Table
            columns={columns}
            data={paginatedData}
            totalRows={responseData?.length || 0}
            isLoading={false}
            error={null}
            renderData={renderData}
        />
    )
}