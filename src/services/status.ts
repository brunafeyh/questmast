import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { SelectionProcessStatus } from "../types/status";

class SelectionProcessStatusService {
    private apiUrl: string;

    constructor(apiUrl: string = `/selection-process-status`) {
        this.apiUrl = apiUrl;
    }

    async getAllStatus(): Promise<SelectionProcessStatus[]> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}/all`)
        return response.data;
    }
}

export default SelectionProcessStatusService;
