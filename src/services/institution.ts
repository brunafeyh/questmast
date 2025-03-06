import axios from "axios";
import { API_BASE_URL } from "../shared/api"
import { Institution } from "../types/institution";

class InstitutionService {
    private apiUrl: string;

    constructor(apiUrl: string = `/institution`) {
        this.apiUrl = apiUrl;
    }

    async getAllInstitutions(): Promise<Institution[]> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}`)
        return response.data;
    }
}

export default InstitutionService;
