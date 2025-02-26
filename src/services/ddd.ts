import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { DDDList } from "../types/phone";

class DDDAddressService {
    async fetchDDD(): Promise<DDDList[]> {
        const response = await axios.get(`${API_BASE_URL}/ddd`);
        return response.data
    }
}

export default DDDAddressService;
