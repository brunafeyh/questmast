import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { QuestionnaireList } from "../types/questionarry-list";
import { QuestionnaireForm } from "../types/questionnaire";

class QuestionnaryService {
    async createQuestionnary(form: QuestionnaireForm): Promise<QuestionnaireList> {
        const response = await axios.post(`${API_BASE_URL}/questionnaire`, form)
        return response.data
    }
}

export default QuestionnaryService
