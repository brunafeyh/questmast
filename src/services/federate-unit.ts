import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { FederateUnit } from "../types/federate-unit";

class FederateUnitService {
    async getAllFederates(): Promise<FederateUnit[]> {
        const response = await axios.get(`${API_BASE_URL}/federate-unit`)
        return response.data;
    }
}

export default FederateUnitService;
