import apiInstance from "../shared/api";
import { FederateUnit } from "../types/federate-unit";

class FederateUnitService {
    private apiUrl: string;

    constructor(apiUrl: string = `/federate-unit`) {
        this.apiUrl = apiUrl;
    }

    async getAllFederates(): Promise<FederateUnit[]> {
        const response = await apiInstance.get(`${this.apiUrl}`)
        return response.data;
    }
}

export default FederateUnitService;
