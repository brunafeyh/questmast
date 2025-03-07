import axios from "axios"
import { API_BASE_URL } from "../shared/api"
import { SubjectTopic } from "../types/subject-topic"

class SubjectTopicService {
    private apiUrl: string;

    constructor(apiUrl: string = `/subject-topic`) {
        this.apiUrl = apiUrl;
    }

    async getSubjectTopics(id: number): Promise<SubjectTopic[]> {
        const response = await axios.get(`${API_BASE_URL}${this.apiUrl}`, {
            params: {
                subjectId: id
            }
        })
        return response.data;
    }
}

export default SubjectTopicService;
