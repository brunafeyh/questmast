import axios from "axios";
import { API_BASE_URL } from "../shared/api"
import { QuestionRespondForm } from "../types/questionnary-respond-form";
import { QuestionaryRespond } from "../types/questionnary-respond";

class SolvedQuestionnaryService {
    private apiUrl: string;

    constructor(apiUrl: string = `/solved-questionnaire`) {
        this.apiUrl = apiUrl;
    }
    
    async solveQuestionnary(form: QuestionRespondForm): Promise<QuestionaryRespond> {
        const response = await axios.post(`${API_BASE_URL}${this.apiUrl}`, form)
        return response.data
    }
}

export default SolvedQuestionnaryService;
