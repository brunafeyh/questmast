import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { ProfessionalLevel } from "../types/professional-level";

class ProfessionalLevelService {
    async fetchProfessionalLevel(): Promise<ProfessionalLevel[]> {
        const response = await axios.get(`${API_BASE_URL}/professional-level`);
        return response.data
    }
}

export default ProfessionalLevelService;