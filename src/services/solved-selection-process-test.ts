import axios from "axios";
import { API_BASE_URL } from "../shared/api"
import { SolvedSelectionProcessTest } from "../types/solved-selection-process-test";
import { SolvedTestResponse } from "../types/solved-tests-response";

class SolvedSelectionProcessTestService {
    private apiUrl: string;

    constructor(apiUrl: string = `/solved-selection-process-test`) {
        this.apiUrl = apiUrl;
    }

    async resolveSeletionProcessTest(form: SolvedSelectionProcessTest): Promise<SolvedTestResponse> {
        const response = await axios.post(`${API_BASE_URL}${this.apiUrl}`, form)
        return response.data
    }

    async getresolvedSeletionProcessTest(id: number, studentMainEmail: string): Promise<SolvedTestResponse> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}/last`, {
            params: {
                selectionProcessTestId: id,
                studentMainEmail: studentMainEmail
            }
        })
        return response.data
    }
}

export default SolvedSelectionProcessTestService;
