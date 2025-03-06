import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { Function } from "../types/function";

class FunctionService {
    async fetchFunctions(): Promise<Function[]> {
        const response = await axios.get(`${API_BASE_URL}/function`);
        return response.data
    }
}

export default FunctionService
