import axios from "axios";
import { API_BASE_URL } from "../shared/api";
import { Test } from "../types/test-list";

class TestIaService {
  async getQuestionsWithIa(file: File): Promise<Test> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await axios.post(
      `${API_BASE_URL}/selection-process-test/gemini`,
      formData
    )
    return response.data
  }
}

export default TestIaService;
