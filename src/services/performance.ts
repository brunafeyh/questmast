import axios from "axios"
import { API_BASE_URL } from "../shared/api"
import { Stats } from "../types/stats"

class PerformanceService {
    private apiUrl: string;

    constructor(apiUrl: string = `/performance`) {
        this.apiUrl = apiUrl;
    }

    async getPerformance(email: string): Promise<Stats> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}/${email}`)
        return response.data;
    }
}

export default PerformanceService