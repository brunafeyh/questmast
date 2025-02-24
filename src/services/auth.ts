import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { AuthCredentials } from "../types/auth";
import { PersonRegisterType } from "../types/person-register";

class AuthService {
    async login(credentials: AuthCredentials ): Promise<string> {
        const response = await axios.post(`${API_BASE_URL}/authentication/login`, credentials);
        return response.data;
    }

    async register(credentials: PersonRegisterType ): Promise<string> {
        const response = await axios.post(`${API_BASE_URL}/authentication/login`, credentials);
        return response.data;
    }
}

export default AuthService;
