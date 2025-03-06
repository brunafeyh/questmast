import axios from "axios";
import { API_BASE_URL } from "../shared/api"
import { SelectionProcess, SelectionProcessList } from "../types/selection-process";

class SelectionProcessService {
    private apiUrl: string;

    constructor(apiUrl: string = `/selection-process`) {
        this.apiUrl = apiUrl;
    }
    async addSeletionProcess(form: SelectionProcess): Promise<void> {
        await axios.post(`${API_BASE_URL}${this.apiUrl}`, form)
    }
    async getSeletionProcess(id: number): Promise<SelectionProcessList> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}/${id}`)
        return response.data
    }

    async listSeletionProcess(): Promise<SelectionProcessList[]> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}`)
        return response.data
    }
}

export default SelectionProcessService;
