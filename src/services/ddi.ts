import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { DDIList } from "../types/phone";

class DDIAddressService {
    async fetchDDI(): Promise<DDIList[]> {
        const response = await axios.get(`${API_BASE_URL}/ddi`);
        return response.data
    }
}

export default DDIAddressService;
