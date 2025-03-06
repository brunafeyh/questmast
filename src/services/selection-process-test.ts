import axios from "axios";
import { API_BASE_URL } from "../shared/api"
import { AddTestFormData } from "../types/test"

class SelectionProcessTestService {
    private apiUrl: string;

    constructor(apiUrl: string = `/selection-process-test`) {
        this.apiUrl = apiUrl;
    }
    
    async addSeletionProcessTest(form: AddTestFormData): Promise<void> {
        await axios.post(`${API_BASE_URL}${this.apiUrl}`, form)
    }
}

export default SelectionProcessTestService;
