import apiInstance from "../shared/api";
import { DDIList } from "../types/phone";

class DDIAddressService {
    private apiUrl: string;

    constructor(apiUrl: string = `/ddi`) {
        this.apiUrl = apiUrl;
    }

    async fetchDDI(): Promise<DDIList[]> {
        const response = await apiInstance.get(`${this.apiUrl}`);
        return response.data
    }
}

export default DDIAddressService;
