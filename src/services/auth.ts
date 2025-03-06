import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { AuthCredentials } from "../types/auth";
import { PersonRegisterType } from "../types/person-register";
import { UpdatePasswordVerificationForm, VerificationForm } from "../types/verifiy";
import { UserEmails } from "../types/user-emails";

class AuthService {
    async login(credentials: AuthCredentials): Promise<string> {
        const response = await axios.post(`${API_BASE_URL}/authentication`, credentials);
        return response.data;
    }

    async register(credentials: PersonRegisterType): Promise<void> {
        await axios.post(`${API_BASE_URL}/authentication/register`, credentials);
    }

    async getEmailfromCPF(cpf: string): Promise<UserEmails> {
        return (await axios.get(`${API_BASE_URL}/authentication/${cpf}`)).data
    }

    async changePassword(email: string): Promise<void> {
        await axios.post(`${API_BASE_URL}/authentication/password-change/${email}`)
    }

    async updatePassword(form: UpdatePasswordVerificationForm): Promise<void> {
        await axios.post(`${API_BASE_URL}/authentication/update-password`, form)
    }

    async verifyEmail(form: VerificationForm): Promise<void> {
        await axios.post(`${API_BASE_URL}/authentication/verify-email/${form.email}`, null, {
            params: {
                verificationEmailCode: form.verificationEmailCode
            }
        })
    }
}

export default AuthService;
