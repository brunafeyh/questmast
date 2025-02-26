import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { StreetType } from "../types/adress";

class StreetTypeService {
    async fetchStreetType(): Promise<StreetType[]> {
        const response = await axios.get(`${API_BASE_URL}/street-type`)
        return response.data
    }
}

export default StreetTypeService
