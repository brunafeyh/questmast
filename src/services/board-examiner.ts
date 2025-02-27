import apiInstance from "../shared/api";
import { BoardExaminer } from "../types/border-examiner"

class BoardExaminerService {
    private apiUrl: string;

    constructor(apiUrl: string = `/board-examiner`) {
        this.apiUrl = apiUrl;
    }

    async getAllBoardExaminer(): Promise<BoardExaminer[]> {
        const response = await apiInstance.get(`${this.apiUrl}`)
        return response.data
    }
}

export default BoardExaminerService
