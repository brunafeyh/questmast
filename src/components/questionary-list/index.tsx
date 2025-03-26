import { ColumnDef, Row } from "@tanstack/react-table"
import { TableCellBody, TableRowBody } from "../table/styles"
import { FC } from "react"
import { usePaginateArray } from "../../hooks/use-paginate-array"
import Table from "../table"
import { useQuestionnaries } from "../../hooks/use-questionnaruies"
import { useAuth } from "../../hooks/use-auth"
import { useNavigate } from "react-router-dom"
import Loading from "../loading"

const columns: ColumnDef<any, any>[] = [
    {
        accessorKey: 'title',
        header: 'Título',
    },
]


export const QuestionaryTable: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const filter = {
    studentMainEmail: user?.email || "",
  };

  const { data: questionnaries = [], isLoading } = useQuestionnaries(filter)

  const tableData = questionnaries.map((item, index) => ({
    id: item.questionnaire.id.toString(),
    title: item.questionnaire.name,
    viewCounter: String(item.questionnaire.viewCounter),
    rawIndex: index, 
  }));


  const paginatedData = usePaginateArray(tableData);

 if (isLoading) return <Loading/>
  return (
    <Table
      columns={columns}
      data={paginatedData}
      totalRows={tableData.length}
      isLoading={false}
      error={null}
      renderData={(row: Row<any>) => {
        const index = row.original.rawIndex;
        const questionnaire = questionnaries[index]
        return (
          <TableRowBody
            key={row.id}
            hover
            onClick={() =>
                navigate("/questionary/respond", {
                  state: { questionnaire: questionnaire },
                })
              }
           
          >
            <TableCellBody>{row.getValue("title")}</TableCellBody>
          </TableRowBody>
        );
      }}
    />
  );
};
