import axios from "axios";
import { API_BASE_URL } from "../shared/api"
import { Test } from "../types/test-list";
import { TestFormData } from "../types/test";

class SelectionProcessTestService {
    private apiUrl: string;

    constructor(apiUrl: string = `/selection-process-test`) {
        this.apiUrl = apiUrl;
    }

    async addSeletionProcessTest(form: TestFormData): Promise<void> {
        await axios.post(`${API_BASE_URL}${this.apiUrl}`, form)
    }

    async updateSeletionProcessTest(form: TestFormData, id: number): Promise<void> {
        await axios.put(`${API_BASE_URL}${this.apiUrl}/${id}`, form)
    }

    async getSeletionProcessTestById(id: number): Promise<Test> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}/${id}`)
        return response.data
    }

    async getMoreViewedSeletionProcessTest(): Promise<Test[]> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}/view`)
        return response.data
    }


    async deleteSeletionProcessTestById(id: number, email: string): Promise<void> {
        await axios.delete(`${API_BASE_URL}${this.apiUrl}/${id}`, {
            params: {
                email: email
            }
        })
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
