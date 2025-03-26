import { SolvedQuestionnaireResponse } from "../types/questionnary-solved-list";

type TableRowData = {
  id: string;
  title: string;
  viewCounter: string;
};

export function mapSolvedQuestionnairesToTableData(
  list: SolvedQuestionnaireResponse
): TableRowData[] {
  return list.map((item) => ({
    id: item.questionnaire.id.toString(),
    title: item.questionnaire.name,
    viewCounter: String(item.questionnaire.viewCounter),
  }));
}