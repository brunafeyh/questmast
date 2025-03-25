import { QuestionnaireList } from "../types/questionarry-list"

type TableRowData = {
    id: string;
    title: string;
    viewCounter: string;
}

export function mapQuestionnairesToTableData(
    list: QuestionnaireList[]
): TableRowData[] {
    return list.map((q) => ({
        id: q.id.toString(),
        title: q.name,
        viewCounter: String(q.viewCounter) || "-",
    }))
}