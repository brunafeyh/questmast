import axios from "axios";
import  { API_BASE_URL } from "../shared/api";
import { CityDTO } from "../types/selection-process";

class CityService {
    async getAllCityesfromUF(uf: string): Promise<CityDTO[]> {
        const response = await axios.get(`${API_BASE_URL}/city/extern/${uf}`)
        return response.data
    }
}

export default CityService
