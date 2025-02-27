import apiInstance from "../shared/api"
import { Institution } from "../types/institution";

class InstitutionService {
    private apiUrl: string;

    constructor(apiUrl: string = `/institution`) {
        this.apiUrl = apiUrl;
    }

    async getAllInstitutions(): Promise<Institution[]> {
        const response = await apiInstance.get(`${this.apiUrl}`)
        return response.data;
    }
}

export default InstitutionService;
