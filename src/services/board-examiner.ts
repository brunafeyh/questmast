import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { BoardExaminer } from "../types/border-examiner"

class BoardExaminerService {
    async getAllBoardExaminer(): Promise<BoardExaminer[]> {
        const response = await axios.get(`${API_BASE_URL}/board-examiner`)
        return response.data
    }
}

export default BoardExaminerService
