import apiInstance from "../shared/api";
import { SelectionProcessStatus } from "../types/status";

class SelectionProcessStatusService {
    private apiUrl: string;

    constructor(apiUrl: string = `/selection-process-status`) {
        this.apiUrl = apiUrl;
    }

    async getAllStatus(): Promise<SelectionProcessStatus[]> {
        const response = await apiInstance.get(`${this.apiUrl}/all`)
        return response.data;
    }
}

export default SelectionProcessStatusService;
