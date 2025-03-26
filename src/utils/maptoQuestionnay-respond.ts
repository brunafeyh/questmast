import { QuestionaryRespond } from "../types/questionnary-respond";
import {
    SolvedQuestionnaireResponseItem,
  } from "../types/questionnary-solved-list";
  
  
  export function mapToQuestionaryRespond(
    item: SolvedQuestionnaireResponseItem
  ): QuestionaryRespond {
    return {
      id: item.questionnaire.id,
      startDateTime: item.startDateTime,
      endDateTime: item.endDateTime,
      quantityOfCorrectAnswers: item.quantityOfCorrectAnswers,
      solvedQuestionList: item.solvedQuestionList,
    };
  }
  