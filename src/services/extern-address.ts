import apiInstance from "../shared/api";
import { ExternAddress } from "../types/extern-address";

class ExternAddressService {
    private apiUrl: string;

    constructor(apiUrl: string = `/address/extern`) {
        this.apiUrl = apiUrl;
    }

    async fetchExternAddress(cep: string): Promise<ExternAddress> {
        const response = await apiInstance.get(`${this.apiUrl}/${cep}`);
        return response.data
    }
}

export default ExternAddressService;
