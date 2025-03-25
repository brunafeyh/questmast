import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { QuestionnaireList } from "../types/questionarry-list";
import { QuestionnaireForm } from "../types/questionnaire";

export type SolvedQuestionnaireFilterDTO = {
    questionnaireId?: number;
    studentMainEmail: string;
}
class QuestionnaryService {
    async createQuestionnary(form: QuestionnaireForm): Promise<QuestionnaireList> {
        const response = await axios.post(`${API_BASE_URL}/questionnaire`, form)
        return response.data
    }

    async listQuestionnaries(
        filter: SolvedQuestionnaireFilterDTO
    ): Promise<QuestionnaireList[]> {
        const response = await axios.get(`${API_BASE_URL}/solved-questionnaire`, {
            params: {
                questionnaireId: filter.questionnaireId,
                studentMainEmail: filter.studentMainEmail,
            },
        });
        return response.data;
    }

    async createQuestionnaryIA(form: QuestionnaireForm): Promise<QuestionnaireList> {
        const response = await axios.post(`${API_BASE_URL}/questionnaire/gemini`, form)
        return response.data
    }
}

export default QuestionnaryService
