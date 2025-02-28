import apiInstance from "../shared/api"
import { SelectionProcess, SelectionProcessList } from "../types/selection-process";

class SelectionProcessService {
    private apiUrl: string;

    constructor(apiUrl: string = `/selection-process`) {
        this.apiUrl = apiUrl;
    }
    async addSeletionProcess(form: SelectionProcess): Promise<void> {
        await apiInstance.post(`${this.apiUrl}`, form)
    }
    async getSeletionProcess(id: number): Promise<SelectionProcessList> {
        const response = await apiInstance.get(`${this.apiUrl}/${id}`)
        return response.data
    }

    async listSeletionProcess(): Promise<SelectionProcessList[]> {
        const response = await apiInstance.get(`${this.apiUrl}`)
        return response.data
    }
}

export default SelectionProcessService;
