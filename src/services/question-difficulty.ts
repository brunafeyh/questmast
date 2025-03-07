import axios from "axios"
import { API_BASE_URL } from "../shared/api"
import { Questiondifficulty } from "../types/questions-difficulty"

class QuestionDifficultyService {
    async fetchQuestionDifficulty(): Promise<Questiondifficulty[]> {
        const response = await axios.get(`${API_BASE_URL}/question-difficulty-level`);
        return response.data
    }
}

export default QuestionDifficultyService