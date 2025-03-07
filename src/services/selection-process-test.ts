import axios from "axios";
import { API_BASE_URL } from "../shared/api"
import { AddTestFormData } from "../types/test"
import { Test } from "../types/test-list";

class SelectionProcessTestService {
    private apiUrl: string;

    constructor(apiUrl: string = `/selection-process-test`) {
        this.apiUrl = apiUrl;
    }

    async addSeletionProcessTest(form: AddTestFormData): Promise<void> {
        await axios.post(`${API_BASE_URL}${this.apiUrl}`, form)
    }

    async getSeletionProcessTest(id: number): Promise<Test[]> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}`, {
            params: {
                selectionProcessId: id
            }
        })
        return response.data
    }
}

export default SelectionProcessTestService;
