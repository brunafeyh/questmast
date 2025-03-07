import axios from "axios"
import { API_BASE_URL } from "../shared/api"
import { Subject } from "../types/subject"

class SubjectService {
    private apiUrl: string;

    constructor(apiUrl: string = `/subject`) {
        this.apiUrl = apiUrl;
    }

    async getSubjects(): Promise<Subject[]> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}`)
        return response.data;
    }
}

export default SubjectService;
