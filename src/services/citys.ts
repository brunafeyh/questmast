import apiInstance from "../shared/api";
import { CityDTO } from "../types/selection-process";

class CityService {
    private apiUrl: string;

    constructor(apiUrl: string = `/city/extern`) {
        this.apiUrl = apiUrl;
    }

    async getAllCityesfromUF(uf: string): Promise<CityDTO[]> {
        const response = await apiInstance.get(`${this.apiUrl}/${uf}`)
        return response.data
    }
}

export default CityService
