import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import QuestionnaryService, { SolvedQuestionnaireFilterDTO } from '../services/questionnary'
import { QuestionnaireList } from '../types/questionarry-list'

const service = new QuestionnaryService()

export const useQuestionnaries = (filters: SolvedQuestionnaireFilterDTO) => {
    const { data, isLoading, error, refetch } = useQuery<QuestionnaireList[]>({
        queryKey: ['questionnaries'],
        queryFn: async () => {
            try {
                return await service.listQuestionnaries(filters);
            } catch (error) {
                toast.error('Erro ao carregar os Questionários: ' + error);
                throw error;
            }
        },
    })

    return { data, isLoading, error, refetch }
}
