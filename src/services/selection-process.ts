import apiInstance from "../shared/api"
import { SelectionProcess } from "../types/selection-process";

class SelectionProcessService {
    private apiUrl: string;

    constructor(apiUrl: string = `/selection-process`) {
        this.apiUrl = apiUrl;
    }

    async addSeletionProcess(form: SelectionProcess): Promise<void> {
        await apiInstance.post(`${this.apiUrl}`, form)
    }
}

export default SelectionProcessService;
