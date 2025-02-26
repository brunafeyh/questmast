import apiInstance from "../shared/api";
import { DDDList } from "../types/phone";

class DDDAddressService {
    private apiUrl: string;

    constructor(apiUrl: string = `/ddd`) {
        this.apiUrl = apiUrl;
    }

    async fetchDDD(): Promise<DDDList[]> {
        const response = await apiInstance.get(`${this.apiUrl}`);
        return response.data
    }
}

export default DDDAddressService;
