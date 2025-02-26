import axios from "axios";
import { ExternAddress } from "../types/extern-address";
import { API_BASE_URL } from "../shared/api";

class ExternAddressService {
    async fetchExternAddress(cep: string): Promise<ExternAddress> {
        const response = await axios.get(`${API_BASE_URL}/address/extern/${cep}`);
        return response.data
    }
}

export default ExternAddressService;
